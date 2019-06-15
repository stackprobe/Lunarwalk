using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Utils;

namespace Charlotte
{
	public class Ground
	{
		public static string FileAndDirectoryConfigFile;
		public static string RootDir;
		public static string ResourceDir;
		public static string OutDir;
		public static string OutHtmlFile;
		public static string OutTestMainHtmlFileBase;

		public static string[] ComponentAndScriptDirs;
		public static string[] DefineFiles;
		public static string MainHtmlFile;
		public static string RiotRootDir;
		public static DefineManager DefineManager;
		public static ScriptManager ScriptManager;
		public static ComponentManager ComponentManager;
		public static string MainHtmlText;
		public static string GlobalName;

		public static JCharSet JChars = new JCharSet();
	}
}
