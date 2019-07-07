using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;
using Charlotte.Tests.StarBeat;

namespace Charlotte
{
	class Program
	{
		public const string APP_IDENT = "{15bd2caf-1b05-42e2-97cc-f530c59fa27f}";
		public const string APP_TITLE = "StarBeat";

		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2, APP_IDENT, APP_TITLE);

			Console.WriteLine("Press ENTER.");
			Console.ReadLine();
		}

		private void Main2(ArgsReader ar)
		{
			new ServerTest().Test01();
		}
	}
}
