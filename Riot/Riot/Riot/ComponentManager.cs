using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Tools;

namespace Charlotte
{
	public class ComponentManager
	{
		private List<ComponentFile> ComponentFiles = new List<ComponentFile>();

		public ComponentManager()
		{
			this.Load(Ground.ComponentDir);
		}

		private void Load(string dir)
		{
			string[] files = Directory.GetFiles(dir, "*.component.txt", SearchOption.AllDirectories);

			Array.Sort(files, StringTools.CompIgnoreCase);

			foreach (string file in files)
			{
				this.ComponentFiles.Add(new ComponentFile(file, dir));
			}
		}

		public string GetJSCode()
		{
			StringBuilder buff = new StringBuilder();

			foreach (ComponentFile componentFile in this.ComponentFiles)
			{
				buff.Append(componentFile.GetJSCode());
				buff.Append("\r\n");
			}
			return buff.ToString();
		}

		public string GetCSSCode()
		{
			StringBuilder buff = new StringBuilder();

			foreach (ComponentFile componentFile in this.ComponentFiles)
			{
				buff.Append(componentFile.GetCSSCode());
				buff.Append("\r\n");
			}
			return buff.ToString();
		}

		public void CollectCoName(Action<string> routine)
		{
			foreach (ComponentFile componentFile in this.ComponentFiles)
			{
				routine(componentFile.CoName);
			}
		}
	}
}
