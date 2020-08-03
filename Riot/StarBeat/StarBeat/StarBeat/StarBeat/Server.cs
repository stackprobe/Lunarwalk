using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;
using System.IO;
using Charlotte.StarBeat.Utils;
using System.Reflection;

namespace Charlotte.StarBeat
{
	public class Server
	{
		public void Main(ArgsReader ar)
		{
			int portNo = 80;
			DocRoot docRoot = new DocRoot();
			MIMEType mimeType = new MIMEType();

			if (ar.HasArgs())
				portNo = int.Parse(ar.NextArg());

			portNo = IntTools.ToRange(portNo, 1, 65535);

			while (ar.HasArgs())
				docRoot.AddRootDir(ar.NextArg());

			HTTPServerChannel.RequestTimeoutMillis = 30000; // 30 sec
			HTTPServerChannel.ResponseTimeoutMillis = 2 * 86400000; // 2 day
			//HTTPServerChannel.FirstLineTimeoutMillis = 2000; // 2 sec == def
			HTTPServerChannel.IdleTimeoutMillis = 10000; // 10 sec
			HTTPServerChannel.BodySizeMax = 2000000; // 2 MB
			HTTPServerChannel.BuffSize = 500000; // 500 KB

			HTTPServer hs = new HTTPServer()
			{
				PortNo = portNo,
				//Backlog = 100, // == def
				//ConnectMax = 30, // == def

				Interlude = () =>
				{
					return Console.KeyAvailable == false;
				},

				HTTPConnected = channel =>
				{
					string method = channel.Method;
					string path = channel.Path;

					HTTPRequest hr = new HTTPRequest();

					hr.IP = channel.Channel.Handler.RemoteEndPoint.ToString(); // TODO
					hr.Method = JString.ToJString(channel.Method, false, false, false, false); // 正規化
					hr.URLPath = JString.ToJString(channel.Path, true, false, false, true); // 正規化

					// HACK ??? ParsePathQuery より前に DecodeURL しているのでクエリに '?', '&', '=' を使えない？？？

					ParsePathQuery(hr);

					// 特別な処理：アスタリスクの直前までをパスと見なす。
					{
						int i = hr.Path.IndexOf('*');

						if (i != -1)
							hr.Path = hr.Path.Substring(0, i);
					}

					if (hr.Path[hr.Path.Length - 1] == '/')
						hr.Path += "index.html";

					hr.Path = CommonUtils.GetFairRelPath(hr.Path);
					hr.HTTP_Version = JString.ToJString(channel.HTTPVersion, false, false, false, false); // 正規化

					foreach (string[] headerPair in channel.HeaderPairs)
					{
						hr.HeaderPairs.Add(
							JString.ToJString(headerPair[0], true, false, false, true), // 正規化
							JString.ToJString(headerPair[1], true, false, false, true)  // 正規化
							);
					}

					if (hr.Method == "GET")
					{
						hr.Json = null;
					}
					else if (method == "POST")
					{
						JsonTools.DecodeStringFilter = v => JString.ToJString(v, true, true, true, true);
						JsonTools.DecodeObjectCountMax = 1000;

						hr.Json = JsonTools.Decode(channel.Body); // 正規化
					}
					else
					{
						throw new Exception("不明なメソッド");
					}

					// HACK ??? フォルダの場合の 301 対応

					string targetFile = docRoot.GetRootDirs().Select(v => Path.Combine(v, hr.Path)).FirstOrDefault(v => File.Exists(v));

					if (targetFile == null)
					{
						channel.ResStatus = 404;
					}
					else
					{
						if (StringTools.EndsWithIgnoreCase(targetFile, ".alt.txt"))
						{
							string intervateClassName = File.ReadAllLines(targetFile, Encoding.ASCII)[0];
							Type intervateClass = Type.GetType(intervateClassName + "," + Assembly.GetEntryAssembly().GetName().Name);
							ReflectTools.MethodUnit intervateCtor = ReflectTools.GetConstructor(intervateClass);
							IService service = (IService)intervateCtor.Construct(new object[0]);

							object ret = service.Perform(hr, ref targetFile);

							if (ret != null)
							{
								string sRet = JsonTools.Encode(ObjectTree.Conv(ret));
								byte[] resBody = Encoding.UTF8.GetBytes(sRet);

								channel.ResStatus = 200;
								channel.ResBody_B = resBody;
								channel.ResContentType = "application/json";

								goto endSetResponse;
							}
						}
						channel.ResStatus = 200;

						if (new FileInfo(targetFile).Length <= 2000000)
							channel.ResBody_B = File.ReadAllBytes(targetFile);
						else
							channel.ResBody = ResponseFileReader(targetFile);

						channel.ResContentType = mimeType.FileToContentType(targetFile);

					endSetResponse:
						;
					}
				},
			};

			ProcMain.WriteLog("Server Started");

			hs.Perform();

			ProcMain.WriteLog("Server Ended");
		}

		private static void ParsePathQuery(HTTPRequest hr)
		{
			int queryIndex = hr.URLPath.IndexOf('?');

			if (queryIndex == -1)
			{
				hr.Path = hr.URLPath;
			}
			else
			{
				hr.Path = hr.URLPath.Substring(0, queryIndex);

				string query = hr.URLPath.Substring(queryIndex + 1);
				string[] qTkns = query.Split('&');

				foreach (string qTkn in qTkns)
				{
					string[] qPair = qTkn.Split('=');

					if (qPair.Length == 2)
					{
						hr.Query.Add(qPair[0], qPair[1]);
					}
				}
			}
		}

		private static IEnumerable<byte[]> ResponseFileReader(string file)
		{
			long fileSize = new FileInfo(file).Length;
			long offset = 0L;
			byte[] buff = new byte[2000000];

			while (offset < fileSize)
			{
				int readSize = (int)Math.Min((long)buff.Length, fileSize - offset);

				if (buff.Length != readSize)
					buff = new byte[readSize];

				using (FileStream reader = new FileStream(file, FileMode.Open, FileAccess.Read))
				{
					if (reader.Seek(offset, SeekOrigin.Begin) != offset)
						throw new Exception("応答ファイルのシークに失敗しました。");

					if (reader.Read(buff, 0, readSize) != readSize)
						throw new Exception("応答ファイルの読み込みに失敗しました。");
				}
				yield return buff;

				offset += readSize;
			}
		}
	}
}
