using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading;
using System.Windows.Forms;
using Charlotte.Tools;

namespace Charlotte
{
	class Program
	{
		public const string APP_IDENT = "{de233a83-7167-4891-9471-7e946c7e0971}";
		public const string APP_TITLE = "Server";

		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2, APP_IDENT, APP_TITLE);

#if DEBUG
			if (ProcMain.CUIError)
			{
				Console.WriteLine("Press ENTER.");
				Console.ReadLine();
			}
#endif
		}

		private const string MTX_SERVER = "{5e331ef6-d984-4b93-9a1a-530a92c74311}"; // shared_uuid

		private void Main2(ArgsReader ar)
		{
			using (Mutex mtxProc = MutexTools.Create(MTX_SERVER))
			{
				if (mtxProc.WaitOne(0))
				{
					try
					{
						Main3(ar);
					}
					finally
					{
						mtxProc.ReleaseMutex();
					}
				}
			}
		}

		private void Main3(ArgsReader ar)
		{
			int portNo = 80;
			string docRootDir = @"..\..\..\..\..\home";

			if (ar.HasArgs())
				portNo = int.Parse(ar.NextArg());

			if (ar.HasArgs())
				docRootDir = ar.NextArg();

			portNo = IntTools.Range(portNo, 1, 65535);

			DocRoot docRoot = new DocRoot(docRootDir);
			MIMEType mimeType = new MIMEType();

			HTTPServerChannel.RequestTimeoutMillis = 30000; // 30 sec
			HTTPServerChannel.ResponseTimeoutMillis = 7 * 86400000; // 7 day
			HTTPServerChannel.ChunkTimeoutMillis = 30000; // 30 sec
			//HTTPServerChannel.FirstLineTimeoutMillis = 2000; // 2 sec
			HTTPServerChannel.IdleTimeoutMillis = 10000; // 10 sec
			HTTPServerChannel.BodySizeMax = 2000000; // 2 MB
			HTTPServerChannel.BuffSize = 200000; // 200 KB

			HTTPServer hs = new HTTPServer()
			{
				PortNo = portNo,
				//Backlog = 100,
				//ConnectMax = 30,

				Interlude = () =>
				{
					return Console.KeyAvailable == false;
				},

				HTTPConnected = channel =>
				{
					string method = channel.Method;
					string path = channel.Path;
					int queryIndex = path.IndexOf('?');

					if (queryIndex != -1)
						path = path.Substring(0, queryIndex);

					ProcMain.WriteLog("method: " + method);
					ProcMain.WriteLog("path: " + path);

					if (method == "GET")
					{
						path = DocRootUtils.URLPathToRelPath(path);

						if (docRoot.IsPublishedFile(path))
						{
							string file = Path.Combine(docRootDir, path);

							channel.ResBody_B = File.ReadAllBytes(file); // 巨大なファイルは存在しない前提
							channel.ResContentType = mimeType.FileToContentType(file);
						}
						else
						{
							channel.ResBody_B = Encoding.ASCII.GetBytes("404");
							channel.ResContentType = "text/plain; charset=US-ASCII";
						}
					}
					else if (method == "POST")
					{
						throw null; // TODO
					}
					else
					{
						throw new Exception("不明なメソッド");
					}
				},
			};

			ProcMain.WriteLog("Server Started");

			hs.Perform();

			ProcMain.WriteLog("Server Ended");
		}
	}
}
