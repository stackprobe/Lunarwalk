using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Utils;
using Charlotte.DataModel;
using System.IO;
using Charlotte.Tools;

namespace Charlotte
{
	public class DefineManager
	{
		public List<DefineFile> DefineFiles = new List<DefineFile>();

		public DefineManager()
		{
			this.DefineFiles.Add(new DefineFile(Ground.DefineFile));

			foreach (string dir in Ground.ComponentAndScriptDirs)
			{
				this.Load(dir);
			}
		}

		private void Load(string dir)
		{
			string[] files = Directory.GetFiles(dir, "*.define.txt", SearchOption.AllDirectories);

			Array.Sort(files, StringTools.CompIgnoreCase);

			foreach (string file in files)
			{
				string coName = CommonUtils.PathToCoName(file, dir);

				this.DefineFiles.Add(new DefineFile(file, coName));
			}
		}

		public void CollectProperty(Func<string, string, bool> routine)
		{
			foreach (DefineFile defineFile in this.DefineFiles)
			{
				foreach (DefineDataModel.Property property in defineFile.DefineData.Properties)
				{
					string propName = defineFile.NameToTrueName(property.Name);
					string propValue = property.Value;

					if (routine(propName, propValue) == false)
					{
						return;
					}
				}
			}
		}

		public string GetProperty(string name, string defval = null)
		{
			string value = defval;

			CollectProperty((propName, propValue) =>
			{
				if (name == propName)
				{
					value = propValue;
					return false;
				}
				return true;
			});

			return value;
		}

		public string GetPropertyNN(string name)
		{
			string value = GetProperty(name);

			if (value == null)
				throw new Exception("定義名 '" + name + "' は定義されていません。");

			return value;
		}
	}
}
