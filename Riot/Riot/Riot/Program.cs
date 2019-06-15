using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Windows.Forms;
using Charlotte.Tools;
using Charlotte.Utils;

namespace Charlotte
{
	class Program
	{
		public const string APP_IDENT = "{a5c9bc17-69f4-4708-8b22-4f6ca9eee374}";
		public const string APP_TITLE = "Riot";

		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2, APP_IDENT, APP_TITLE);

#if DEBUG
			//Console.WriteLine("Press ENTER.");
			//Console.ReadLine();
#endif
		}

		private void Main2(ArgsReader ar)
		{
			try
			{
				Main3(ar);

				// 出力先を開く。
				{
					ProcessTools.Batch(new string[] { "start ." }, Ground.OutDir, ProcessTools.WindowStyle_e.INVISIBLE);
				}
			}
			catch (Exception e)
			{
				Console.WriteLine(e);

				Console.WriteLine("Press ENTER.");
				Console.ReadLine();
			}
		}

		private void Main3(ArgsReader ar)
		{
			if (ar.HasArgs())
			{
				Ground.RootDir = FileTools.MakeFullPath(ar.NextArg());
			}
			else
			{
				Ground.RootDir = CommonUtils.GetRiotDir();
			}
			Console.WriteLine("RootDir: " + Ground.RootDir);

			if (Directory.Exists(Ground.RootDir) == false)
				throw new Exception("no RootDir");

			Ground.FileAndDirectoryConfigFile = Path.Combine(Ground.RootDir, "FileAndDirectory.config.txt");
			Ground.ResourceDir = Path.Combine(Ground.RootDir, "res");
			Ground.OutDir = Path.Combine(Ground.RootDir, "out");
			Ground.OutHtmlFile = Path.Combine(Ground.OutDir, "index.html");
			Ground.OutTestMainHtmlFileBase = Path.Combine(Ground.OutDir, "index_");

			Console.WriteLine("ComponentAndScriptConfigFile: " + Ground.FileAndDirectoryConfigFile);
			Console.WriteLine("ResourceDir: " + Ground.ResourceDir);
			Console.WriteLine("OutDir: " + Ground.OutDir);
			Console.WriteLine("OutHtmlFile: " + Ground.OutHtmlFile);
			Console.WriteLine("OutTestMainHtmlFileBase: " + Ground.OutTestMainHtmlFileBase);

			// ---- check ----

			if (File.Exists(Ground.FileAndDirectoryConfigFile) == false)
				throw new Exception("no FileAndDirectoryConfigFile");

			if (Directory.Exists(Ground.ResourceDir) == false)
				throw new Exception("no ResourceDir");

			if (Directory.Exists(Ground.OutDir) == false)
				throw new Exception("no OutDir");

			//Ground.OutHtmlFile
			//Ground.OutTestMainHtmlFileBase

			// ----

			this.LoadFileAndDirectoryConfig();

			Ground.DefineManager = new DefineManager(); // 先に！
			Ground.ScriptManager = new ScriptManager();
			Ground.ComponentManager = new ComponentManager();
			Ground.MainHtmlText = File.ReadAllText(Ground.MainHtmlFile, StringTools.ENCODING_SJIS);
			Ground.GlobalName = Ground.DefineManager.GetPropertyNN("GLOBAL");

			FileTools.CleanupDir(Ground.OutDir);
			FileTools.CopyDir(Ground.ResourceDir, Ground.OutDir);

			foreach (string dir in Ground.ComponentAndScriptDirs)
				this.CopyResources(dir, Ground.OutDir);

			{
				string TESTMAIN_PTN = Guid.NewGuid().ToString("B");
				string outHtmlFormat = Ground.MainHtmlText;

				GlobalIdentifierResolver gir = new GlobalIdentifierResolver();

				{
					string script = Ground.ScriptManager.GetJSCode();
					string component = Ground.ComponentManager.GetJSCode();
					string css = Ground.ComponentManager.GetCSSCode();

					gir.AddJSCode(script);
					gir.AddJSCode(component);

					script = gir.ResolveJSCode(script);
					component = gir.ResolveJSCode(component);
					css = gir.ResolveCSSCode(css);

					outHtmlFormat = StringTools.MultiReplace(outHtmlFormat,
						"riot_script",
						script,
						"riot_component",
						component,
						"riot_css",
						css,
						"riot_testmain",
						TESTMAIN_PTN
						);
				}

				{
					string outHtml = outHtmlFormat;

					outHtml = StringTools.MultiReplace(outHtml,
						TESTMAIN_PTN,
						""
						);

					outHtml = CommonUtils.ToHTMLNewLine(outHtml);

					File.WriteAllText(Ground.OutHtmlFile, outHtml, Encoding.UTF8);
				}

				foreach (ScriptFile scriptFile in Ground.ScriptManager.GetTestMainScriptFiles())
				{
					string outHtml = outHtmlFormat;

					{
						string script = scriptFile.GetJSCode();

						gir.AddJSCode(script);

						script = gir.ResolveJSCode(script);

						outHtml = StringTools.MultiReplace(outHtml,
							TESTMAIN_PTN,
							script
							);
					}

					outHtml = CommonUtils.ToHTMLNewLine(outHtml);

					File.WriteAllText(Ground.OutTestMainHtmlFileBase + scriptFile.CoName + Consts.OUT_TEST_MAIN_HTML_SUFFIX, outHtml, Encoding.UTF8);
				}
			}
		}

		private void LoadFileAndDirectoryConfig()
		{
			TreeText src = new TreeText(Ground.FileAndDirectoryConfigFile);

			{
				TreeText.Node node = src.Root.Children.First(v => v.Line == "ComponentAndScript");

				if (node.Children.Count < 1)
					throw null;

				Ground.ComponentAndScriptDirs = node.Children.Select(
					v =>
					{
						string dir = v.Line;
						dir = Path.Combine(Ground.RootDir, dir);
						Console.WriteLine("ComponentAndScriptDir: " + dir);

						if (Directory.Exists(dir) == false)
							throw new Exception("そんなディレクトリ在りません。");

						return dir;
					}
					).ToArray();
			}

			{
				TreeText.Node node = src.Root.Children.First(v => v.Line == "Define");

				if (node.Children.Count < 1)
					throw null;

				Ground.DefineFiles = node.Children.Select(
					v =>
					{
						string file = v.Line;
						file = Path.Combine(Ground.RootDir, file);
						Console.WriteLine("DefineFile: " + file);

						if (File.Exists(file) == false)
							throw new Exception("そんなファイル在りません。");

						return file;
					}
					).ToArray();
			}

			{
				TreeText.Node node = src.Root.Children.First(v => v.Line == "HomePage");

				if (node.Children.Count != 1)
					throw null;

				string file = node.Children[0].Line;
				file = Path.Combine(Ground.RootDir, file);
				Console.WriteLine("MainHtmlFile: " + file);

				if (File.Exists(file) == false)
					throw new Exception("そんなファイル在りません。");

				Ground.MainHtmlFile = file;
			}

			{
				TreeText.Node node = src.Root.Children.First(v => v.Line == "RiotDirectory");

				if (node.Children.Count != 1)
					throw null;

				string dir = node.Children[0].Line;
				dir = Path.Combine(Ground.RootDir, dir);
				Console.WriteLine("RiotRootDir: " + dir);

				if (Directory.Exists(dir) == false)
					throw new Exception("そんなディレクトリ在りません。");

				Ground.RiotRootDir = dir;
			}
		}

		private void CopyResources(string rootDir, string outDir)
		{
			Console.WriteLine("CopyResource_Begin");

			foreach (string file in Directory.GetFiles(rootDir, "*", SearchOption.AllDirectories))
			{
				if (Consts.RES_FILE_SUFFIXES.Any(suffix => StringTools.EndsWithIgnoreCase(file, suffix)))
				{
					string dir = Path.GetDirectoryName(file);
					string localFile = Path.GetFileName(file);

					string coName = CommonUtils.PathToCoName(dir + ".dir", rootDir);
					string coNamePrefix = CommonUtils.CoNameToCoNamePrefix(coName);

					string outFile = Path.Combine(outDir, Ground.GlobalName + "_" + coNamePrefix + localFile);

					Console.WriteLine("< " + file);
					Console.WriteLine("> " + outFile);

					File.Copy(file, outFile);
				}
			}
			Console.WriteLine("CopyResource_End");
		}
	}
}
