using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Optimizer
{
	public class UnusedFunctionDeleter
	{
		public string Code;
		public int DeleteCount = 0;

		// <---- ref

		private ScriptAnalyser Sa;

		public void Delete()
		{
			this.Sa = new ScriptAnalyser(this.Code);
			this.CollectFunction();

			foreach (FunctionInfo function in this.Functions)
			{
				if (this.IsUsingFunction(function) == false)
				{
					this.DeleteFunction(function);
					this.DeleteCount++;
				}
			}
			this.Code = this.Sa.GetString();
		}

		private class FunctionInfo
		{
			public string Name;
			public int Start;
			public int End;
		};

		private List<FunctionInfo> Functions = new List<FunctionInfo>();

		public void CollectFunction()
		{
			for (int index = 0; index < this.Sa.Tokens.Count; index++)
			{
				if (
					this.Is行頭(index) && // 行頭から function ～ と始まっている。-> グローバル関数と見なす。
					this.Sa.GetNBTokens(index).Skip(0).First().Kind == ScriptAnalyser.Token.Kind_e.TOKEN &&
					this.Sa.GetNBTokens(index).Skip(0).First().Pattern == "function" &&
					this.Sa.GetNBTokens(index).Skip(1).First().Kind == ScriptAnalyser.Token.Kind_e.TOKEN && // ? Name
					this.Sa.GetNBTokens(index).Skip(2).First().Kind == ScriptAnalyser.Token.Kind_e.SYMBOL &&
					this.Sa.GetNBTokens(index).Skip(2).First().Pattern == "("
					)
				{
					FunctionInfo function = new FunctionInfo()
					{
						Name = this.Sa.GetNBTokens(index).Skip(1).First().Pattern,
						Start = index,
						End = -1, // dummy
					};

					int nest = -1;

					for (; ; index++)
					{
						if (this.Sa.Tokens[index].Kind == ScriptAnalyser.Token.Kind_e.SYMBOL)
						{
							foreach (char chr in this.Sa.Tokens[index].Pattern)
							{
								if (chr == '{')
								{
									if (nest == -1)
										nest = 1;
									else
										nest++;
								}
								else if (chr == '}')
								{
									if (nest == -1)
										throw new Exception("関数の { の前に } を読み込みました。");

									nest--;

									if (nest == 0)
										goto reachedFunctionEnd;
								}
							}
						}
					}
				reachedFunctionEnd:
					function.End = index;
					this.Functions.Add(function);
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

		private bool IsUsingFunction(FunctionInfo function)
		{
			for (int index = 0; index < this.Sa.Tokens.Count; index++)
			{
				if (index == function.Start)
				{
					index = function.End;
					continue;
				}

				if (
					this.Sa.Tokens[index].Kind == ScriptAnalyser.Token.Kind_e.TOKEN &&
					this.Sa.Tokens[index].Pattern == function.Name
					)
					return true;
			}
			return false;
		}

		private void DeleteFunction(FunctionInfo function)
		{
			for (int index = function.Start; index <= function.End; index++)
			{
				this.Sa.Tokens[index].Kind = ScriptAnalyser.Token.Kind_e.BLANK;
				this.Sa.Tokens[index].Pattern = "";
			}
		}
	}
}
