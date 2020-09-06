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
		public const string APP_IDENT = "{f84944f1-ce14-4104-8a53-d6a732846c22}";
		public const string APP_TITLE = "ToOneHtml";

		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2, APP_IDENT, APP_TITLE);
		}

		private void Main2(ArgsReader ar)
		{
			string rFile = ar.NextArg();
			string wFile = ar.NextArg();

			new HtmlConverter().ToOneHtml(rFile, wFile);
		}
	}
}
