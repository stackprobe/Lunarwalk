using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Windows.Forms;
using Charlotte.Tools;
using System.Threading;

namespace Charlotte
{
	class Program
	{
		public const string APP_IDENT = "{99dd1b4a-cd3c-47ae-9c34-45fd4096b03a}";
		public const string APP_TITLE = "Jewel";

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
		private const string EV_STOP_SERVER = "{05705d6a-c7b4-4000-91a0-0fea9dc5c3ab}"; // shared_uuid
		private const string EV_DISK_YELLOW = "{586ec0f0-c21d-4475-a7d8-96bb58901985}"; // shared_uuid
		private const string EV_DISK_YELLOW_ENDED = "{5df3a2b6-b0d9-49fd-b415-c5afc971d643}"; // shared_uuid

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

			if (ar.HasArgs())
				portNo = int.Parse(ar.NextArg());

			portNo = IntTools.Range(portNo, 1, 65535);

			HTTPServerChannel.RequestTimeoutMillis = 30000; // 30 sec
			HTTPServerChannel.ResponseTimeoutMillis = 30000; // 30 sec
			//HTTPServerChannel.FirstLineTimeoutMillis = 2000; // 2 sec
			HTTPServerChannel.IdleTimeoutMillis = 10000; // 10 sec
			HTTPServerChannel.BodySizeMax = 2000000; // 2 MB
			HTTPServerChannel.BuffSize = 200000; // 200 KB

			using (NamedEventUnit evStopServer = new NamedEventUnit(EV_STOP_SERVER))
			using (NamedEventUnit evDiskYellow = new NamedEventUnit(EV_DISK_YELLOW))
			using (NamedEventUnit evDiskYellowEnded = new NamedEventUnit(EV_DISK_YELLOW_ENDED))
			{
				HTTPServer hs = new HTTPServer()
				{
					PortNo = portNo,
					//Backlog = 100,
					//ConnectMax = 30,

					Interlude = () =>
					{
						if (evDiskYellow.WaitForMillis(0))
						{
							ProcMain.WriteLog("DISK_YELLOW_START");

							try
							{
								this.DiskYellow();
							}
							catch (Exception e)
							{
								ProcMain.WriteLog(e);
							}

							ProcMain.WriteLog("DISK_YELLOW_END.1");
							evDiskYellowEnded.Set();
							ProcMain.WriteLog("DISK_YELLOW_END.2");
						}
						return evStopServer.WaitForMillis(0) == false && Console.KeyAvailable == false;
					},

					HTTPConnected = channel =>
					{
						string path = channel.Path;
						int queryIndex = path.IndexOf('?');

						if (queryIndex != -1)
							path = path.Substring(0, queryIndex);

						ProcMain.WriteLog("path: " + path);

						IService service = RootGround.I.ServiceDistributor.GetService(path);

						service.Perform(channel);
					},
				};

				ProcMain.WriteLog("BRAVE_JEWEL_SERVER_START");

				hs.Perform();

				ProcMain.WriteLog("BRAVE_JEWEL_SERVER_END");
			}
		}

		private void DiskYellow()
		{
			foreach (IService service in RootGround.I.ServiceDistributor.GetAllService())
			{
				service.DiskYellow();
			}
		}
	}
}
