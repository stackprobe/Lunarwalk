using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Charlotte.Optimizer
{
	public class HtmlFileOptimizer
	{
		public static void Perform(string file)
		{
			string[] lines = File.ReadAllLines(file, Encoding.UTF8);

			string outHtml = HtmlOptimizer.Perform(lines);

			File.WriteAllText(file, outHtml, Encoding.UTF8);
		}
	}
}
