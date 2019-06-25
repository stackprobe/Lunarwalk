using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;
using System.IO;

namespace Charlotte
{
	public class DocRoot
	{
		private SortedList<string> PublishedFiles;

		public DocRoot(string dir)
		{
			dir = FileTools.MakeFullPath(dir);

			if (Directory.Exists(dir) == false)
				throw new Exception("DocRoot does not exists.");

			string[] files = Directory.GetFiles(dir, "*", SearchOption.AllDirectories);

			files = files.Select(v => FileTools.ChangeRoot(v, dir)).ToArray();

			this.PublishedFiles = new SortedList<string>(ArrayTools.ToList(files), StringTools.CompIgnoreCase);
		}

		public bool IsPublishedFile(string file)
		{
			return this.PublishedFiles.Contains(this.PublishedFiles.GetFerret(file));
		}
	}
}
