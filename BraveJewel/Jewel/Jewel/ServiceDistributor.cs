using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;

namespace Charlotte
{
	public class ServiceDistributor
	{
		private Dictionary<string, IService> Services = DictionaryTools.CreateIgnoreCase<IService>();

		public ServiceDistributor()
		{
			this.Add("/uploader", new Services.Uploader.UploaderService());

			// ここへ追加...
		}

		private void Add(string path, IService service)
		{
			this.Services.Add(path, service);
		}

		public IService GetService(string path)
		{
			return this.Services[path];
		}

		public IEnumerable<IService> GetAllService()
		{
			return this.Services.Values;
		}
	}
}
