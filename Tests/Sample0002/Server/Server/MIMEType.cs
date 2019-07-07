using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Tools;

namespace Charlotte
{
	public class MIMEType
	{
		/// <summary>
		/// 拡張子 ⇒ Content-Type
		/// </summary>
		private Dictionary<string, string> Pairs = DictionaryTools.CreateIgnoreCase<string>();

		private const string DEF_CONTENT_TYPE = "application/octet-stream";

		public MIMEType()
		{
			this.AddPair(".html", "text/html");
			this.AddPair(".png", "image/png");
			this.AddPair(".ico", "image/vnd.microsoft.icon");

			// ここへ追加...
		}

		private void AddPair(string ext, string contentType)
		{
			this.Pairs.Add(ext, contentType);
		}

		public string FileToContentType(string file)
		{
			string ext = Path.GetExtension(file);

			return this.GetContentType(ext);
		}

		private string GetContentType(string ext)
		{
			if (this.Pairs.ContainsKey(ext) == false)
			{
				return DEF_CONTENT_TYPE;
			}
			return this.Pairs[ext];
		}
	}
}
