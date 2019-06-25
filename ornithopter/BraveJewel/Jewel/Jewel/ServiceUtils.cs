using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte
{
	public class ServiceUtils
	{
		public static ObjectTree GetRequestJson(HTTPServerChannel channel)
		{
			return new ObjectTree(JsonTools.Decode(channel.Body));
		}

		public static void SetResponseJson(HTTPServerChannel channel, object src)
		{
			channel.ResBody_B = Encoding.UTF8.GetBytes(JsonTools.Encode(ObjectTree.Conv(src)));
			channel.ResContentType = "application/json";
		}
	}
}
