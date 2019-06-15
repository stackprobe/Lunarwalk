using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Tools;

namespace Charlotte
{
	public class ScriptManager
	{
		private List<ScriptFile> ScriptFiles = new List<ScriptFile>();

		public ScriptManager()
		{
			this.Load(Ground.ComponentDir);
			this.Load(Ground.ScriptDir);
		}

		private void Load(string dir)
		{
			string[] files = Directory.GetFiles(dir, "*.js", SearchOption.AllDirectories);

			Array.Sort(files, StringTools.CompIgnoreCase);

			foreach (string file in files)
			{
				this.ScriptFiles.Add(new ScriptFile(file, dir));
			}
		}

		public string GetJSCode()
		{
			StringBuilder buff = new StringBuilder();

			foreach (ScriptFile scriptFile in this.ScriptFiles.Where(f => f.IsForTest() == false))
			{
				buff.Append(scriptFile.GetJSCode());
				buff.Append("\r\n");
			}
			string code = buff.ToString();

			//code = ResolveScriptToken(code);

			return code;
		}

		public IEnumerable<ScriptFile> GetTestMainScriptFiles()
		{
			return this.ScriptFiles.Where(f => f.IsForTest());
		}
	}
}
