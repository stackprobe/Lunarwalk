using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Charlotte.Optimizer
{
	public class HtmlFileOptimizer
	{
		public static void Perform(string rFile, string wFile, ScriptOptimizer.Routine_d routine)
		{
			ScriptOptimizer.Routine = routine;
			Perform(rFile, wFile);
			ScriptOptimizer.Routine = null;
		}

		public static void Perform(string rFile, string wFile)
		{
			string[] lines = File.ReadAllLines(rFile, Encoding.UTF8);

			string outHtml = HtmlOptimizer.Perform(lines);

			File.WriteAllText(wFile, outHtml, Encoding.UTF8);
		}
	}
}
