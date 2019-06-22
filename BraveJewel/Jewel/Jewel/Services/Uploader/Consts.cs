
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Services.Uploader
{
	public class Consts
	{
		public const string STORE_DIR = @"C:\appdata\BraveJewel.Uploader";
		public const string CATALOG_FILE = @"C:\appdata\BraveJewel.Uploader.dat";

		public const long TOTAL_SIZE_MAX = 30000000000L; // 30 gb
		public const int FILE_NUM_MAX = 10000;
	}
}
