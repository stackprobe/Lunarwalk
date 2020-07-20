using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;
using System.IO;

namespace Charlotte.Utils
{
	public class JCharSet
	{
		private HashSet<char> JChrs = new HashSet<char>();

		public JCharSet()
		{
			using (MemoryStream dest = new MemoryStream())
			{
				for (int count = 0; count <= 0xffff; count++)
				{
					if (JString.JChar.I.Contains((ushort)count))
					{
						dest.WriteByte((byte)((count >> 8) & 0xff));
						dest.WriteByte((byte)((count >> 0) & 0xff));
					}
				}
				foreach (char chr in StringTools.ENCODING_SJIS.GetString(dest.ToArray()))
				{
					this.JChrs.Add(chr);
				}
			}
		}

		public bool Contains(char chr)
		{
			return this.JChrs.Contains(chr);
		}
	}
}
