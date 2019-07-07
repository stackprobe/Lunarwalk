using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte.Optimizer.Utils
{
	public class WrapCode
	{
		private static readonly string B64CODE_CHARS = StringTools.DECIMAL + StringTools.ALPHA + StringTools.alpha + "+/";

		public string Wrap(string code)
		{
			code = CodeToBase64(code);

			char m = ArrayTools.Largest(B64CODE_CHARS
				.Where(v => code[0] != v && code[code.Length - 1] != v) // 2bs
				.Select(v => new { c = v, n = code.Where(w => w == v).Count() }), (a, b) => a.n - b.n).c;

			code = string.Join("" + m, code.Split(m).Reverse());
			code =
				"var s=\"" +
				code +
				"\",m=\"" +
				m +
				"\";" +
				CodeEscape("eval(decodeURIComponent(escape(atob(s.split(m).reverse().join(m)))));");

			return code;
		}

		private string CodeToBase64(string code)
		{
			for (; ; )
			{
				string ret = new Base64Unit().Encode(Encoding.UTF8.GetBytes(code));

				if (ret[ret.Length - 1] != '=')
					return ret;

				code += ' ';
			}
		}

		private string CodeEscape(string code)
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
