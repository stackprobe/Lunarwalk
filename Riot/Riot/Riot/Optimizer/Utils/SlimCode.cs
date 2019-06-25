using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte.Optimizer.Utils
{
	class SlimCode
	{
		public static string Slim(string code)
		{
			code = DeleteComment(code);
			code = DeleteBlank(code);

			return code;
		}

		private static string DeleteComment(string code)
		{
			ScriptAnalyser sa = new ScriptAnalyser(code);

			for (int index = 0; index < sa.Tokens.Count; index++)
			{
				if (sa.Tokens[index].Kind == ScriptAnalyser.Token.Kind_e.COMMENT)
				{
					sa.Tokens[index].Kind = ScriptAnalyser.Token.Kind_e.BLANK;
					sa.Tokens[index].Pattern = "";
				}
			}
			return sa.GetString();
		}

		private static string DeleteBlank(string code)
		{
			ScriptAnalyser sa = new ScriptAnalyser(code);

			for (int index = 0; index < sa.Tokens.Count; index++)
			{
				if (sa.Tokens[index].Kind == ScriptAnalyser.Token.Kind_e.BLANK)
				{
					string ptn = sa.Tokens[index].Pattern;
					int ndx = ptn.LastIndexOf('\n');

					if (ndx != -1)
					{
						bool mltLf = 2 <= ptn.Where(v => v == '\n').Count();

						ptn = ptn.Substring(ndx);

						if (mltLf)
							ptn = "\n" + ptn;

						sa.Tokens[index].Pattern = ptn;
					}
					else if (StringTools.LiteValidate(ptn, " ", 2))
					{
						ptn = " ";
						sa.Tokens[index].Pattern = ptn;
					}
				}
			}
			return sa.GetString();
		}
	}
}
