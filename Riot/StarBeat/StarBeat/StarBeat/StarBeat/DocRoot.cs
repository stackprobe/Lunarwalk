using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Tools;

namespace Charlotte.StarBeat
{
	public class DocRoot
	{
		private List<string> RootDirs = new List<string>();

		public void AddRootDir(string dir)
		{
			dir = FileTools.MakeFullPath(dir);

			if (Directory.Exists(dir) == false)
				throw new Exception("そんなフォルダありません。");

			this.RootDirs.Add(dir);
		}

		public IEnumerable<string> GetRootDirs()
		{
			return this.RootDirs;
		}
	}
}
