using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Utils;
using Charlotte.DataModel;

namespace Charlotte
{
	public class DefineFile
	{
		public TreeText Text;
		public DefineDataModel DefineData;
		public string CoName;

		public DefineFile(string file, string coName = null)
		{
			this.Text = new TreeText(file);
			this.DefineData = new DefineDataModel(this.Text);
			this.CoName = coName;
		}

		public string NameToTrueName(string name)
		{
			if (this.CoName != null)
			{
				name = CommonUtils.CoNameToCoNamePrefix(this.CoName) + name;
			}
			return name;
		}
	}
}
