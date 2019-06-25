using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte
{
	public interface IService
	{
		void Perform(HTTPServerChannel channel);
		void DiskYellow();
	}
}
