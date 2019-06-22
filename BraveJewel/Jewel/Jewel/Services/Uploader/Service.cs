using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte.Services.Uploader
{
	public class UploaderService : IService
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
