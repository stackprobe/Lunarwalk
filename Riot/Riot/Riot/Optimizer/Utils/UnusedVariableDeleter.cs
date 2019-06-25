using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Optimizer.Utils
{
	public class UnusedVariableDeleter
	{
		public string Code;

		// <---- ref

		public int DeleteCount = 0;

		// <---- out

		private ScriptAnalyser Sa;

		public void Delete()
		{
			this.Sa = new ScriptAnalyser(this.Code);
			this.CollectVariable();

			foreach (VariableInfo variable in this.Variables)
			{
				if (this.IsUsingVariable(variable) == false)
				{
					this.DeleteFunction(variable);
					this.DeleteCount++;
				}
			}
			this.Code = this.Sa.GetString();
		}

		private class VariableInfo
		{
			public string Name;
			public int Start;
			public int End;
		};

		private List<VariableInfo> Variables = new List<VariableInfo>();

		public void CollectVariable()
		{
			for (int index = 0; index < this.Sa.Tokens.Count; index++)
			{
				if (
					this.Is行頭(index) && // 行頭から var ～ と始まっている。-> グローバル変数と見なす。
					this.Sa.GetNBTokens(index).Skip(0).First().Kind == ScriptAnalyser.Token.Kind_e.TOKEN &&
					this.Sa.GetNBTokens(index).Skip(0).First().Pattern == "var" &&
					this.Sa.GetNBTokens(index).Skip(1).First().Kind == ScriptAnalyser.Token.Kind_e.TOKEN // ? Name
					)
				{
					VariableInfo variable = new VariableInfo()
					{
						Name = this.Sa.GetNBTokens(index).Skip(1).First().Pattern,
						Start = index,
						End = -1, // dummy
					};

					int nest = 0;

					for (; ; index++)
					{
						if (this.Sa.Tokens[index].Kind == ScriptAnalyser.Token.Kind_e.SYMBOL)
						{
							foreach (char chr in this.Sa.Tokens[index].Pattern)
							{
								if (chr == ';')
								{
									goto reachedVariableEnd;
								}
								if (chr == '{')
								{
									nest++;
								}
								else if (chr == '}')
								{
									nest--;

									if (nest < 0)
										throw new Exception("関数又は連想配列の '{' の前に '}' を読み込みました。");
								}
							}
						}
					}
				reachedVariableEnd:
					variable.End = index;
					this.Variables.Add(variable);
				}
			}
		}

		private bool Is行頭(int index)
		{
			if (index == 0)
				return true;

			return
				this.Sa.Tokens[index - 1].Kind == ScriptAnalyser.Token.Kind_e.BLANK &&
				this.Sa.Tokens[index - 1].Pattern.EndsWith("\n");
		}

		private bool IsUsingVariable(VariableInfo variable)
		{
			for (int index = 0; index < this.Sa.Tokens.Count; index++)
			{
				if (index == variable.Start)
				{
					index = variable.End;
					continue;
				}

				if (
					this.Sa.Tokens[index].Kind == ScriptAnalyser.Token.Kind_e.TOKEN &&
					this.Sa.Tokens[index].Pattern == variable.Name
					)
					return true;
			}
			return false;
		}

		private void DeleteFunction(VariableInfo variable)
		{
			for (int index = variable.Start; index <= variable.End; index++)
			{
				this.Sa.Tokens[index].Kind = ScriptAnalyser.Token.Kind_e.BLANK;
				this.Sa.Tokens[index].Pattern = "";
			}
		}
	}
}
