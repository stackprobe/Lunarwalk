using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte.Services.TestService.Echo
{
	public class Service : IService
	{
		public void Perform(HTTPServerChannel channel)
		{
			ObjectTree prm = ServiceUtils.GetRequestJson(channel);

			object prmData = prm.Direct();

			ServiceUtils.SetResponseJson(channel, prmData);
		}

		public void DiskYellow()
		{
			// noop
		}
	}
}
