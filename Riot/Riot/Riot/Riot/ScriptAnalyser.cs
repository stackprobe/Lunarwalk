using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte
{
	public class ScriptAnalyser
	{
		public class Token
		{
			public enum Kind_e
			{
				LITERAL,
				COMMENT,
				BLANK,
				SYMBOL,
				TOKEN,
			}

			public Kind_e Kind;
			public string Pattern;
		}

		public List<Token> Tokens = new List<Token>();
		public Token[] NBTokens;

		public ScriptAnalyser(string code)
		{
			this.LoadTokens(code);
			this.PostLoad();
		}

		private void LoadTokens(string code)
		{
			for (int index = 0; index < code.Length; )
			{
				char chr = code[index];

				if (chr == '\r')
				{
					index++;
					continue;
				}
				if (chr == '"' || chr == '\'')
				{
					int ndx = SkipLiteral(code, index + 1, chr);

					this.Tokens.Add(new Token()
					{
						Kind = Token.Kind_e.LITERAL,
						Pattern = code.Substring(index, ndx - index),
					});

					index = ndx;
					continue;
				}
				if (CommonUtils.SubstringIs(code, index, "/*"))
				{
					int ndx = code.IndexOf("*/", index + 2);

					if (ndx == -1)
						throw new Exception("/* ～ */ 型のコメントが閉じられていません。");

					ndx += 2; // */の分

					this.Tokens.Add(new Token()
					{
						Kind = Token.Kind_e.COMMENT,
						Pattern = code.Substring(index, ndx - index),
					});

					index = ndx;
					continue;
				}
				if (CommonUtils.SubstringIs(code, index, "//"))
				{
					int ndx = code.IndexOf('\n', index + 2);

					if (ndx == -1)
						ndx = code.Length;

					this.Tokens.Add(new Token()
					{
						Kind = Token.Kind_e.COMMENT,
						Pattern = code.Substring(index, ndx - index),
					});

					index = ndx;
					continue;
				}
				if (IsBlank(chr))
				{
					int ndx = index;

					do
					{
						ndx++;
					}
					while (ndx < code.Length && IsBlank(code[ndx]));

					this.Tokens.Add(new Token()
					{
						Kind = Token.Kind_e.BLANK,
						Pattern = code.Substring(index, ndx - index),
					});

					index = ndx;
					continue;
				}
				if (IsSymbol(chr))
				{
					int ndx = index;

					do
					{
						ndx++;
					}
					while (ndx < code.Length && IsSymbol(code[ndx]));

					this.Tokens.Add(new Token()
					{
						Kind = Token.Kind_e.SYMBOL,
						Pattern = code.Substring(index, ndx - index),
					});

					index = ndx;
					continue;
				}

				{
					int ndx = index;

					do
					{
						ndx++;
					}
					while (
						ndx < code.Length &&
						code[ndx] != '"' &&
						code[ndx] != '\'' &&
						IsBlank(code[ndx]) == false &&
						IsSymbol(code[ndx]) == false
						);

					this.Tokens.Add(new Token()
					{
						Kind = Token.Kind_e.TOKEN,
						Pattern = code.Substring(index, ndx - index),
					});

					index = ndx;
				}
			}
		}

		private static bool IsBlank(char chr)
		{
			return chr <= ' ';
		}

		private static bool IsSymbol(char chr)
		{
			return
				chr != '"' &&
				chr != '\'' &&
				chr != '\\' &&
				chr != '_' &&
				chr != '$' &&
				StringTools.PUNCT.Contains(chr);
		}

		private int SkipLiteral(string code, int index, char literalEndChar)
		{
			for (; index < code.Length; index++)
			{
				char chr = code[index];

				if (chr == '\\' && index + 1 < code.Length)
				{
					index++;
					continue;
				}
				if (chr == literalEndChar)
				{
					index++;
					break;
				}
			}
			return index;
		}

		private void PostLoad()
		{
			this.NBTokens = this.Tokens.Where(token => token.Kind != Token.Kind_e.BLANK).ToArray();
		}

		public IEnumerable<Token> GetNBTokens(int index = 0)
		{
			for (; index < this.Tokens.Count; index++)
				if (this.Tokens[index].Kind != Token.Kind_e.BLANK)
					yield return this.Tokens[index];
		}

		public string GetString()
		{
			return string.Join("", this.Tokens.Select(token => token.Pattern));
		}
	}
}
