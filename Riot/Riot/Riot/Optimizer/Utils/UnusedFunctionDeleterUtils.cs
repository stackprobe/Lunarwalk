using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Optimizer.Utils
{
	public static class UnusedFunctionDeleterUtils
	{
		public static string Delete(string code)
		{
			for (; ; )
			{
				UnusedFunctionDeleter ufd = new UnusedFunctionDeleter()
				{
					Code = code,
				};

				ufd.Delete();

				if (ufd.DeleteCount == 0)
					break;

				code = ufd.Code;
			}
			return code;
		}
	}
}
