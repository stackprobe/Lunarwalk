using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading;
using System.Windows.Forms;
using Charlotte.Tools;
using Charlotte.StarBeat;

namespace Charlotte
{
	class Program
	{
		public const string APP_IDENT = "{de233a83-7167-4891-9471-7e946c7e0971}";
		public const string APP_TITLE = "Server";

		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2, APP_IDENT, APP_TITLE);

#if DEBUG
			if (ProcMain.CUIError)
			{
				Console.WriteLine("Press ENTER.");
				Console.ReadLine();
			}
#endif
		}

		private void Main2(ArgsReader ar)
		{
#if DEBUG
			new Server().Main(new ArgsReader(new string[]
			{
				"" + 80,
				@"..\..\..\..\out",
				@"..\..\..\..\DocRoot",
			}
			));
#else
			new Server().Main(ar);
#endif
		}
	}
}
