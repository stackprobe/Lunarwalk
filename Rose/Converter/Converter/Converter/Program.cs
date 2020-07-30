using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Windows.Forms;
using Charlotte.Tools;

namespace Charlotte
{
	class Program
	{
		public const string APP_IDENT = "{5f88321b-fe1f-44f8-a2ea-96597b84aeae}";
		public const string APP_TITLE = "Converter";

		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2, APP_IDENT, APP_TITLE);

#if DEBUG
			//if (ProcMain.CUIError)
			{
				//Console.WriteLine("Press ENTER.");
				//Console.ReadLine();
			}
#endif
		}

		private void Main2(ArgsReader ar)
		{
			string resDir = null;
			List<string> srcDirs = new List<string>();
			string outJSFile = null;
			string tagsFile = null;

			while (true)
			{
				if (ar.ArgIs("/R"))
				{
					resDir = ar.NextArg();
					continue;
				}
				if (ar.ArgIs("/S"))
				{
					srcDirs.Add(ar.NextArg());
					continue;
				}
				if (ar.ArgIs("/WB"))
				{
					outJSFile = ar.NextArg();
					outJSFile = FileTools.MakeFullPath(outJSFile);
					outJSFile += ".js";
					continue;
				}
				if (ar.ArgIs("/T"))
				{
					tagsFile = ar.NextArg();
					continue;
				}
				if (ar.HasArgs())
					throw new Exception("不明なコマンド引数");

				break;
			}

			if (resDir == null)
				throw new Exception("リソースディレクトリを指定して下さい。");

			if (srcDirs.Count == 0)
				throw new Exception("ソースディレクトリを指定して下さい。");

			if (outJSFile == null)
				throw new Exception("出力JSファイルを指定して下さい。");

			if (tagsFile == null)
				throw new Exception("tagsファイルを指定して下さい。");

			{
				JSModuleConverter mc = new JSModuleConverter();

				mc.LoadResourceDir(resDir);

				foreach (string srcDir in srcDirs)
					mc.LoadSourceDir(srcDir);

				mc.WriteJSFile(outJSFile);
			}

			using (WorkingDir wd = new WorkingDir())
			{
				const string MID_TAGS_FILE = "tags.mid.tmp";

				ProcessTools.Batch(new string[]
				{
					string.Format(@"C:\Factory\DevTools\makeTags.exe /JS {0} {1}", outJSFile, MID_TAGS_FILE),
				},
				wd.GetPath(".")
				);

				if (File.Exists(wd.GetPath(MID_TAGS_FILE)) == false)
					throw new Exception("tagsファイルの生成に失敗しました。");

				File.AppendAllLines(tagsFile, File.ReadAllLines(wd.GetPath(MID_TAGS_FILE)), StringTools.ENCODING_SJIS); // 注意：追記する。
			}
		}
	}
}
