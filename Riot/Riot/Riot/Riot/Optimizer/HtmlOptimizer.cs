using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte.Optimizer
{
	public static class HtmlOptimizer
	{
		public static string Perform(string[] lines)
		{
			ScriptPart scriptPart = new ScriptPart(lines);

			scriptPart.ScriptLines = new List<string>(ScriptOptimizer.Routine(scriptPart.ScriptLines.ToArray()));

			string outHtml = scriptPart.GetString();
			outHtml = CommonUtils.ToHTMLNewLine(outHtml);
			return outHtml;
		}

		private class ScriptPart
		{
			public List<string> Before = new List<string>();
			public List<string> ScriptLines = new List<string>();
			public List<string> After = new List<string>();

			public ScriptPart(string[] lines)
			{
				List<string> dest = this.Before;

				foreach (string line in lines)
				{
					if (IsEndScriptLine(line))
						dest = After;

					dest.Add(line);

					if (IsStartScriptLine(line))
						dest = ScriptLines;
				}
			}

			public string GetString()
			{
				List<string> dest = new List<string>();

				dest.AddRange(this.Before);
				dest.AddRange(this.ScriptLines);
				dest.AddRange(this.After);

				return FileTools.LinesToText(dest.ToArray());
			}
		}

		private static bool IsStartScriptLine(string line)
		{
			return line == "<script>";
		}

		private static bool IsEndScriptLine(string line)
		{
			return line == "</script>";
		}
	}
}
