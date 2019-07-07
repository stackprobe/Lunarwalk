using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.StarBeat;

namespace Charlotte.TestServices
{
	public class Echo : IService
	{
		public object Perform(HTTPRequest hr, ref string targetFile)
		{
			return hr.Json;
		}
	}
}
