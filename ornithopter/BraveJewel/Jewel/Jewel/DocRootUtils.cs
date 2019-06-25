using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte
{
	public class DocRootUtils
	{
		public static string URLPathToRelPath(string path)
		{
			if (path.EndsWith("/"))
				path += "index.html";

			if (path[0] == '/')
				path = path.Substring(1);

			return path.Replace('/', '\\');
		}
	}
}
