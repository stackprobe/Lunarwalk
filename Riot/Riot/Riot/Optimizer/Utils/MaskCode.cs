using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte.Optimizer.Utils
{
	public class MaskCode
	{
		public static string Mask(string code)
		{
			return "var s=\"" + new Base64Unit().Encode(Encoding.UTF8.GetBytes(code)) + "\";" + Escape("eval(decodeURIComponent(escape(atob(s))));");
		}

		private static string Escape(string code)
		{
			StringBuilder buff = new StringBuilder();

			foreach (char chr in code)
			{
				if ((StringTools.DECIMAL + StringTools.ALPHA + StringTools.alpha).Contains(chr))
					buff.Append(string.Format("\\u{0:x4}", (int)chr));
				else
					buff.Append(chr);
			}
			return buff.ToString();
		}
	}
}
