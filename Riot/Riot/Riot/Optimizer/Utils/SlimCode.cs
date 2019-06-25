using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Optimizer.Utils
{
	class SlimCode
	{
		public static string Slim(string code)
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
			sa = new ScriptAnalyser(sa.GetString());

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
				}
			}
			return sa.GetString();
		}
	}
}
