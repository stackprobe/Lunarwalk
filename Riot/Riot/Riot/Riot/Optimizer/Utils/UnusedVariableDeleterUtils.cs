using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Optimizer.Utils
{
	public static class UnusedVariableDeleterUtils
	{
		public static string Delete(string code)
		{
			for (; ; )
			{
				UnusedVariableDeleter uvd = new UnusedVariableDeleter()
				{
					Code = code,
				};

				uvd.Delete();

				if (uvd.DeleteCount == 0)
					break;

				code = uvd.Code;
			}
			return code;
		}
	}
}
