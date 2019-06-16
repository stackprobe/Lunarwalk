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
			foreach (string file in Ground.DefineFiles)
			{
				this.DefineFiles.Add(new DefineFile(file));
			}
			foreach (string dir in Ground.ComponentAndScriptDirs)
			{
				this.Load(dir);
			}
			this.PostLoad();
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

		private void PostLoad()
		{
			// 後から定義された方を優先する。

			foreach (DefineFile defineFile in this.DefineFiles)
			{
				int end = defineFile.DefineData.Properties.Count;

				for (int left = 0; left < end - 1; left++)
					for (int right = left + 1; right < end; right++)
						if (CheckCollision(defineFile, left, defineFile, right))
							break;

				defineFile.DefineData.Properties.RemoveAll(v => v == null);
			}

			{
				int end = this.DefineFiles.Count;

				for (int left = 0; left < end - 1; left++)
				{
					for (int right = left + 1; right < end; right++)
					{
						DefineFile l = this.DefineFiles[left];
						DefineFile r = this.DefineFiles[right];

						for (int ll = 0; ll < l.DefineData.Properties.Count; ll++)
							for (int rr = 0; rr < r.DefineData.Properties.Count; rr++)
								if (CheckCollision(l, ll, r, rr))
									break;

						l.DefineData.Properties.RemoveAll(v => v == null);
					}
				}
			}
		}

		private static bool CheckCollision(DefineFile l, int ll, DefineFile r, int rr)
		{
			if (
				l.NameToTrueName(l.DefineData.Properties[ll].Name) ==
				r.NameToTrueName(r.DefineData.Properties[rr].Name)
				)
			{
				Console.WriteLine("定義が重複しています。" + l.NameToTrueName(l.DefineData.Properties[ll].Name));
				Console.WriteLine("- " + l.DefineData.Properties[ll].Value);
				Console.WriteLine("+ " + r.DefineData.Properties[rr].Value);

				l.DefineData.Properties[ll] = null;

				return true;
			}
			return false;
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
