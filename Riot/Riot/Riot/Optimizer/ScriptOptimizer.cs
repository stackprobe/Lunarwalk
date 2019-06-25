using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte.Optimizer
{
	public class ScriptOptimizer
	{
		public static string[] Perform(string[] lines)
		{
			string code = FileTools.LinesToText(lines);

			code = UnusedFunctionDeleterHelper.Delete(code);
			code = UnusedVariableDeleterHelper.Delete(code);

			return FileTools.TextToLines(code);
		}
	}
}
