using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Utils
{
	public class SourceLineInfo
	{
		public string FilePath;
		public int LineNumber;

		public ErrorChecker ErrorChecker()
		{
			return new ErrorChecker(message => { throw new Exception(this.FilePath + " " + this.LineNumber + " 行目 ⇒ " + message); });
		}
	}
}
