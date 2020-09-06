using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Tools;

namespace Charlotte
{
	public class HtmlConverter
	{
		public void ToOneHtml(string rFile, string wFile)
		{
			File.WriteAllText(wFile, this.GetOneHtml(rFile), StringTools.ENCODING_SJIS);
		}

		private string GetOneHtml(string file)
		{
			string text = File.ReadAllText(file, StringTools.ENCODING_SJIS);
			file = FileTools.MakeFullPath(file);
			string dir = Path.GetDirectoryName(file);
			string homeDir = Directory.GetCurrentDirectory();

			Directory.SetCurrentDirectory(dir);
			try
			{
				foreach (StringTools.Enclosed encl in StringTools.GetAllEnclosed(text, "src=\"", "\""))
				{
					text = this.EmbedSrcFile(text, encl.StartPtn.End, encl.EndPtn.Start);
				}

				{
					string[] lines = FileTools.TextToLines(text);

					for (int index = 0; index < lines.Length; index++)
					{
						string line = lines[index];

						if (line.Contains("// @:res"))
						{
							StringTools.Enclosed encl = StringTools.GetEnclosed(line, "\"", "\"");

							if (encl == null)
								throw new Exception("No Literal");

							line = this.EmbedSrcFile(line, encl.StartPtn.End, encl.EndPtn.Start);
							lines[index] = line;
						}
					}
					text = FileTools.LinesToText(lines);
				}
			}
			finally
			{
				Directory.SetCurrentDirectory(homeDir);
			}

			return text;
		}

		private int ESF_Depth = 1;

		private string EmbedSrcFile(string text, int p, int q)
		{
			if (30 < this.ESF_Depth)
				throw new Exception("So deep");

			this.ESF_Depth++;
			try
			{
				string srcFile = text.Substring(p, q - p);
				srcFile = srcFile.Replace("/", "\\");

				if (srcFile == "" || File.Exists(srcFile) == false)
					throw new Exception("Bad srcFile");

				string srcExt = Path.GetExtension(srcFile);
				string lwrSrcExt = srcExt.ToLower();
				byte[] srcData;
				string srcType;

				if (lwrSrcExt == ".html")
				{
					string srcText = this.GetOneHtml(srcFile);
					srcData = StringTools.ENCODING_SJIS.GetBytes(srcText);
					srcType = "text/html";
				}
				else
				{
					srcData = File.ReadAllBytes(srcFile);
					srcType = this.GetTypeByExt(srcExt);
				}
				string eText = new Base64Unit().Encode(srcData);

				return text.Substring(0, p) + "data:" + srcType + ";base64," + eText + text.Substring(q);
			}
			finally
			{
				this.ESF_Depth--;
			}
		}

		private string GetTypeByExt(string ext)
		{
			ext = ext.ToLower();

			if (ext == ".js") return "text/javascript";
			if (ext == ".bmp") return "image/bmp";
			if (ext == ".gif") return "image/gif";
			if (ext == ".jpg") return "image/jpeg";
			if (ext == ".jpeg") return "image/jpeg";
			if (ext == ".png") return "image/png";
			if (ext == ".mp3") return "audio/mpeg";

			// 新しいタイプをここへ追加..

			throw new Exception("不明な拡張子");
		}
	}
}
