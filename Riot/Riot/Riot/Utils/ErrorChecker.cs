using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Utils
{
	public class ErrorChecker
	{
		public Action<string> Error = null;

		public ErrorChecker(Action<string> errorRtn)
		{
			this.Error = errorRtn;
		}

		public void CheckFairName(string name, string extraAllowChars = "")
		{
			if (CommonUtils.IsFairName(name, extraAllowChars) == false)
			{
				this.Error("不正な名前です。");
			}
		}
	}
}
