using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;
using Charlotte.Optimizer.Utils;

namespace Charlotte.Optimizer
{
	public class ScriptOptimizer
	{
		public delegate string[] Routine_d(string[] lines);

		public static Routine_d Routine = null;

		public static string[] Slim(string[] lines)
		{
			string code = FileTools.LinesToText(lines);

			code = UnusedFunctionDeleterUtils.Delete(code);
			code = UnusedVariableDeleterUtils.Delete(code);
			code = SlimCode.Slim(code);

			return FileTools.TextToLines(code);
		}

		public static string[] Wrap(string[] lines)
		{
			string code = FileTools.LinesToText(lines);

			code = new WrapCode().Wrap(code);

			return new string[] { "", code, "" };
		}
	}
}
