using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;
using System.IO;

namespace Charlotte.StarBeat.Utils
{
	public static class CommonUtils
	{
		public static string GetFairRelPath(string path)
		{
			List<string> dest = new List<string>();

			foreach (string pTkn in StringTools.Tokenize(path, "\\/", false, true))
			{
				dest.Add(DenebolaToolkit.GetFairLocalPath(pTkn, ""));
			}
			return Path.Combine(dest.ToArray());
		}
	}
}
