using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte.Services.Sample.Uploader
{
	public class Service : IService
	{
		public void Perform(HTTPServerChannel channel)
		{
			// TODO

			channel.ResContentType = "text/plane: charset=US-ASCII";
			channel.ResBody_B = Encoding.ASCII.GetBytes("TODO");
		}

		public void DiskYellow()
		{
			// TODO ???
		}
	}
}
