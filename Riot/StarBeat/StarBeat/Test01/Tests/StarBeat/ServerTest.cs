using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;
using Charlotte.StarBeat;

namespace Charlotte.Tests.StarBeat
{
	public class ServerTest
	{
		public void Test01()
		{
			new Server().Main(new ArgsReader(new string[]
			{
				"" + 80,
				@"..\..\..\..\Test01\DocRoot",
			}
			));
		}
	}
}
