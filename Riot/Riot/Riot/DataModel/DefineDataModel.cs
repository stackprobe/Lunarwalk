using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Utils;
using Charlotte.Tools;

namespace Charlotte.DataModel
{
	public class DefineDataModel
	{
		public class Property
		{
			public string Name;
			public string Value; // 自由な文字列
		}

		public TreeText Source;
		public List<Property> Properties = new List<Property>();

		public DefineDataModel(TreeText src)
		{
			this.Source = src;
			this.LoadProperties(src);
			this.PostLoad();
		}

		private void LoadProperties(TreeText src)
		{
			foreach (TreeText.Node propNode in src.Root.Children)
			{
				if (propNode.Children.Count != 1)
					propNode.ErrorChecker().Error("プロパティの配下は１つの値でなければなりません。");

				if (propNode.Children[0].Children.Count != 0)
					propNode.ErrorChecker().Error("プロパティの値の配下は空でなければなりません。");

				string propName = propNode.Line;
				string propValue = propNode.Children[0].Line;

				propNode.ErrorChecker().CheckFairName(propName);
				// propValue ⇒ 自由な文字列

				this.Properties.Add(new Property()
				{
					Name = propName,
					Value = propValue,
				});
			}
		}

		private void PostLoad()
		{
			this.ResolveAlias();
		}

		private void ResolveAlias()
		{
			List<StringTools.ReplaceInfo> ptns = new List<StringTools.ReplaceInfo>();

			// 置き換え対象書式 = @[xxx]

			// make ptns
			{
				ptns.Add(new StringTools.ReplaceInfo()
				{
					OldValue = "@[PW9]",
					GetValueNew = () => SecurityTools.MakePassword_9(),
					IgnoreCase = false,
				});
			}

			StringTools.ReplaceInfo[] infos = ptns.ToArray();

			foreach (Property property in this.Properties)
			{
				property.Value = StringTools.MultiReplace(property.Value, infos);
			}
		}
	}
}
