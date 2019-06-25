using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte
{
	public class RootGround
	{
		private static RootGround _i = null;

		public static RootGround I
		{
			get
			{
				if (_i == null)
					_i = new RootGround();

				return _i;
			}
		}

		public ServiceDistributor ServiceDistributor = new ServiceDistributor();
	}
}
