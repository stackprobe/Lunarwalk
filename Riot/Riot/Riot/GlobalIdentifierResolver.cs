using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte
{
	public class GlobalIdentifierResolver
	{
		private TreeSet<string> Identifiers = DictionaryTools.CreateSet();
		//private SortedList<string> Identifiers = new SortedList<string>(StringTools.Comp); // old

		public void AddJSCode(string code)
		{
			ScriptAnalyser sa = new ScriptAnalyser(code);

			CollectGlobalIdentifier(sa);
		}

		private void CollectGlobalIdentifier(ScriptAnalyser sa)
		{
			ScriptAnalyser.Token[] tokens = sa.NBTokens;

			for (int index = 0; index < tokens.Length; index++)
			{
				ScriptAnalyser.Token token = tokens[index];

				if (tokens[index].Kind == ScriptAnalyser.Token.Kind_e.TOKEN &&
					(tokens[index].Pattern == "function" || tokens[index].Pattern == "var") && index + 1 < tokens.Length &&
					IsGlobalIdentifier(tokens[index + 1].Pattern))
				{
					this.Identifiers.Add(tokens[index + 1].Pattern);
				}
			}
		}

		private static bool IsGlobalIdentifier(string token)
		{
			return
				StringTools.ALPHA.Contains(token[0]) || // ? 大文字で始まっている。
				token.StartsWith("riot_");
		}

		public string ResolveJSCode(string code)
		{
			ScriptAnalyser sa = new ScriptAnalyser(code);

			ResolveGlobalIdentifier(sa);

			return sa.GetString();
		}

		private void ResolveGlobalIdentifier(ScriptAnalyser sa)
		{
			ScriptAnalyser.Token[] tokens = sa.NBTokens;

			foreach (ScriptAnalyser.Token token in tokens)
			{
				if (token.Kind == ScriptAnalyser.Token.Kind_e.TOKEN && this.Identifiers.Contains(token.Pattern))
				//if (token.Kind == ScriptAnalyser.Token.Kind_e.TOKEN && this.Identifiers.Contains(this.Identifiers.GetFerret(token.Pattern))) // old
				{
					token.Pattern = Ground.GlobalName + "_" + token.Pattern;
				}
			}
		}

		public string ResolveCSSCode(string code)
		{
			string[] lines = FileTools.TextToLines(code);

			for (int index = 0; index < lines.Length; index++)
			{
				string line = lines[index];

				if (line != "" && line[0] == '.')
				{
					line = "." + Ground.GlobalName + "_" + line.Substring(1);
					lines[index] = line;
				}
			}
			return FileTools.LinesToText(lines);
		}
	}
}
