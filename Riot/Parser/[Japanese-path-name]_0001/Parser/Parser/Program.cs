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
		public const string APP_IDENT = "{e5691e32-5c47-4fb4-909e-a10fbd42feb5}";
		public const string APP_TITLE = "Parser";

		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2, APP_IDENT, APP_TITLE);

#if DEBUG
			Console.WriteLine("Press ENTER.");
			Console.ReadLine();
#endif
		}

		private void Main2(ArgsReader ar)
		{
			Directory.SetCurrentDirectory(ExtraTools.GetHomeDir());

			using (CsvFileReader reader = new CsvFileReader(@"src\syukujitsu.csv"))
			using (StreamWriter writer = new StreamWriter(@"dest\祝日.js.txt", false, StringTools.ENCODING_SJIS))
			{
				if (reader.ReadRow() == null) // ヘッダ
					throw null; // 想定外！

				for (; ; )
				{
					string[] row = reader.ReadRow();

					if (row == null)
						break;

					if (row.Length != 2)
						throw null; // 想定外！

					string date = row[0];
					string name = row[1];

					string[] dateTokens = StringTools.Tokenize(date, "/");

					if (dateTokens.Length != 3)
						throw null; // 想定外！

					int y = int.Parse(dateTokens[0]);
					int m = int.Parse(dateTokens[1]);
					int d = int.Parse(dateTokens[2]);

					int iDate = y * 10000 + m * 100 + d;

					writer.WriteLine("\t[ " + iDate + ", \"" + name.Replace("\"", "\\\"") + "\" ],");
				}
			}
		}
	}
}
