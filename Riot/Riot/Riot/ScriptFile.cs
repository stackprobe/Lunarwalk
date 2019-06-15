using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Tools;

namespace Charlotte
{
	public class ScriptFile
	{
		public string FilePath;
		public string CoName;
		public string CoNamePrefix;
		public string Text;

		public ScriptFile(string file, string rootDir)
		{
			this.FilePath = file;
			this.CoName = CommonUtils.PathToCoName(file, rootDir);
			this.CoNamePrefix = CommonUtils.CoNameToCoNamePrefix(this.CoName);
			this.Text = File.ReadAllText(file, StringTools.ENCODING_SJIS);

			Console.WriteLine("FilePath: " + this.FilePath);
			Console.WriteLine("CoName: " + this.CoName);
			Console.WriteLine("CoNamePrefix: " + this.CoNamePrefix);
			Console.WriteLine("Text: " + this.Text.Length);
		}

		public string GetJSCode()
		{
			try
			{
				string code = Text;

				code = CommonUtils.ResolveAlias(code, this.CoName);
				code = MaskComment(code);
				code = ResolveRiotCommand(code);
				code = ResolveScriptToken(code);

				return code;
			}
			catch (Exception e)
			{
				throw new Exception("スクリプトファイルに問題があります。ファイル名：" + this.FilePath, e);
			}
		}

		public bool IsForTest()
		{
			return StringTools.EndsWithIgnoreCase(this.FilePath, ".test.js");
		}

		private static string MaskComment(string code)
		{
			code = MaskCLangComment(code);
			code = MaskCPPComment(code);

			return code;
		}

		private static string MaskCLangComment(string code)
		{
			int start = 0;

			for (; ; )
			{
				start = SeekSkipLiteral(code, index => CommonUtils.SubstringIs(code, index, "/*"), start);

				if (start == -1)
					break;

				start += 2;
				int end = code.IndexOf("*/", start);

				if (end == -1)
					throw new Exception("/* ～ */ 型のコメントが閉じられていません。");

				code = code.Substring(0, start) + Consts.STR_HALF_SPACE + "Riot" + Consts.STR_HALF_SPACE + code.Substring(end);
				start += 8;
			}
			return code;
		}

		private static string MaskCPPComment(string code)
		{
			int start = 0;

			for (; ; )
			{
				start = SeekSkipLiteral(code, index => CommonUtils.SubstringIs(code, index, "//"), start);

				if (start == -1)
					break;

				start += 2;
				int end = code.IndexOf('\n', start);

				if (end == -1)
					end = code.Length;

				code = code.Substring(0, start) + Consts.STR_HALF_SPACE + "Riot" + code.Substring(end);
				start += 6;
			}
			return code;
		}

		private static int SeekSkipLiteral(string str, Func<int, bool> match, int start)
		{
			char literalBeginChar = '\0';

			for (int index = start; index < str.Length; index++)
			{
				if (str[index] == '\\' && index + 1 < str.Length && (str[index + 1] == '"' || str[index + 1] == '\''))
				{
					index++;
				}
				else if (literalBeginChar == '\0')
				{
					if (str[index] == '"' || str[index] == '\'')
					{
						literalBeginChar = str[index];
					}
					else if (match(index))
					{
						return index;
					}
				}
				else if (str[index] == literalBeginChar)
				{
					literalBeginChar = '\0';
				}
			}
			return -1;
		}

		private string ResolveRiotCommand(string code)
		{
			List<string> dest = new List<string>();

			foreach (string line in FileTools.TextToLines(code))
			{
				if (line != "" && line[0] == '!')
				{
					string[] tokens = StringTools.Tokenize(line.Substring(1), " ", false, true, 2);

					string command = tokens[0];
					string trailer = tokens[1];

					if (command == "import")
					{
						tokens = StringTools.Tokenize(trailer, " ", false, true, 2);

						string sFileEncoding = tokens[0];
						string file = tokens[1];
						Encoding fileEncoding = Encoding.GetEncoding(sFileEncoding);

						{
							string homeDir = Directory.GetCurrentDirectory();
							try
							{
								Directory.SetCurrentDirectory(Ground.RootDir);

								file = Path.Combine(Ground.RootDir, file);
							}
							finally
							{
								Directory.SetCurrentDirectory(homeDir);
							}
						}

						dest.AddRange(File.ReadAllLines(file, fileEncoding));
					}
					else
					{
						throw new Exception("不明なコマンドです。" + line);
					}
				}
				else
				{
					dest.Add(line);
				}
			}
			return FileTools.LinesToText(dest.ToArray());
		}

		private string ResolveScriptToken(string code)
		{
			ScriptAnalyser sa = new ScriptAnalyser(code);

			Resolve厳密等価演算子(sa);

			return sa.GetString();
		}

		private void Resolve厳密等価演算子(ScriptAnalyser sa2)
		{
			ScriptAnalyser.Token[] tokens = sa2.NBTokens;

			for (int index = 0; index < tokens.Length; index++)
			{
				ScriptAnalyser.Token token = tokens[index];

				if (token.Kind == ScriptAnalyser.Token.Kind_e.SYMBOL && token.Pattern == "==")
				{
					if (
						index + 1 < tokens.Length &&
						tokens[index + 1].Kind == ScriptAnalyser.Token.Kind_e.TOKEN &&
						tokens[index + 1].Pattern == "false"
						)
					{
						token.Pattern = "!==";
						tokens[index + 1].Pattern = "true";
					}
					else
					{
						token.Pattern = "===";
					}
				}
				else if (token.Kind == ScriptAnalyser.Token.Kind_e.SYMBOL && token.Pattern == "!=")
				{
					token.Pattern = "!==";
				}
			}
		}
	}
}
