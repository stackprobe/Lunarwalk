using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;
using System.IO;

namespace Charlotte
{
	public class JSModuleConverter
	{
		private string HeaderCode;
		private string FooterCode;

		public void LoadResourceDir(string dir)
		{
			this.HeaderCode = File.ReadAllText(Path.Combine(dir, "Header.js"), StringTools.ENCODING_SJIS);
			this.FooterCode = File.ReadAllText(Path.Combine(dir, "Footer.js"), StringTools.ENCODING_SJIS);
		}

		public void LoadSourceDir(string dir)
		{
			dir = FileTools.MakeFullPath(dir);

			foreach (string file in Directory.GetFiles(dir, "*.js", SearchOption.AllDirectories))
			{
				this.LoadSourceFile(file, dir);
			}
		}

		private List<string> MiddleCodes = new List<string>();

		public void LoadSourceFile(string file, string rootDir)
		{
			string code = File.ReadAllText(file, StringTools.ENCODING_SJIS);

			code = this.SolveAliases(code, file, rootDir);
			code = this.SolveMacroes(code, file);

			this.MiddleCodes.Add(code);
		}

		private string SolveAliases(string code, string file, string rootDir)
		{
			List<string> ptns = new List<string>();

			// @@, @@^, @@^^, @@^^^, ...
			{
				string coName = CommonUtils.PathToCoName(file, rootDir);
				string ptn = "@@";

				for (; ; )
				{
					ptns.Add(ptn);
					ptns.Add(coName);

					coName = CommonUtils.CoNameToParent(coName);

					if (coName == null)
						break;

					ptn += "^";
				}
			}

			Console.WriteLine("ptns: " + string.Join(", ", ptns));

			code = StringTools.MultiReplace(code, ptns.ToArray());
			return code;
		}

		private string SolveMacroes(string code, string file)
		{
			string eYFile = file.Replace("\\", "/");
			string[] lines = FileTools.TextToLines(code);

			for (int index = 0; index < lines.Length; index++)
			{
				string line = lines[index];
				string tLine = line.Trim();

				if (tLine == "@:LOGPOS")
				{
					lines[index] = string.Format(
						"console.log(\"{0} ({1})\"); // @:LOGPOS",
						eYFile,
						index + 1
						);
				}
				else if (tLine.StartsWith("@:errorCase "))
				{
					string cond = tLine.Substring(tLine.IndexOf(' ')).Trim();

					lines[index] = string.Format(
						"if({0}) {{ console.error(\"{1} ({2})\"); }} // @:errorCase",
						cond,
						eYFile,
						index + 1
						);
				}
			}
			code = FileTools.LinesToText(lines);
			return code;
		}

		public void WriteJSFile(string outJSFile)
		{
			using (StreamWriter writer = new StreamWriter(outJSFile, false, StringTools.ENCODING_SJIS))
			{
				writer.WriteLine(this.HeaderCode);

				foreach (string code in this.MiddleCodes)
					writer.WriteLine(code);

				writer.WriteLine(this.FooterCode);
			}
		}
	}
}
