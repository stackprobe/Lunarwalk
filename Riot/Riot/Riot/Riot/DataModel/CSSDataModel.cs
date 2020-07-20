using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Utils;
using Charlotte.Tools;

namespace Charlotte.DataModel
{
	public class CSSDataModel
	{
		public class Selector
		{
			public string Name;
			public List<Property> Properties = new List<Property>();
		}

		public class Property
		{
			public string Name;
			public string Value; // 自由な文字列
		}

		public TreeText Source;
		public List<Selector> Selectors = new List<Selector>();

		public CSSDataModel(TreeText src)
		{
			this.Source = src;
			this.LoadSelectors(src);
			this.PostLoad();
		}

		private void LoadSelectors(TreeText src)
		{
			foreach (TreeText.Node selectorNode in src.Root.Children)
			{
				string name = selectorNode.Line;

				selectorNode.ErrorChecker().CheckFairName(name, ":");

				Selector selector = new Selector()
				{
					Name = name,
				};

				foreach (TreeText.Node propNode in selectorNode.Children)
				{
					if (propNode.Children.Count != 1)
						propNode.ErrorChecker().Error("プロパティの配下は１つの値でなければなりません。");

					if (propNode.Children[0].Children.Count != 0)
						propNode.ErrorChecker().Error("プロパティの値の配下は空でなければなりません。");

					string propName = propNode.Line;
					string propValue = propNode.Children[0].Line;

					if (propName == "@import")
					{
						int index = ArrayTools.IndexOf(this.Selectors.ToArray(), s => s.Name == propValue);

						if (index == -1)
							propNode.ErrorChecker().Error("不正なセレクタ参照です。");

						foreach (Property property in this.Selectors[index].Properties)
						{
							selector.Properties.Add(new Property()
							{
								Name = property.Name,
								Value = property.Value,
							});
						}
					}
					else if (propName[0] == '@')
					{
						propNode.ErrorChecker().Error("不正な参照です。");
					}
					else
					{
						propNode.ErrorChecker().CheckFairName(propName, "-");
						// propValue ⇒ 自由な文字列

						selector.Properties.Add(new Property()
						{
							Name = propName,
							Value = propValue,
						});
					}
				}
				this.Selectors.Add(selector);
			}
		}

		private void PostLoad()
		{
			foreach (Selector selector in this.Selectors)
			{
				this.ResolveSameProperty(selector);
			}
		}

		private void ResolveSameProperty(Selector selector)
		{
			// 後から定義された方を優先する。

			int end = selector.Properties.Count;

			for (int left = 0; left < end - 1; left++)
			{
				for (int right = left + 1; right < end; right++)
				{
					if (selector.Properties[left].Name == selector.Properties[right].Name)
					{
						selector.Properties[left] = null;
						break;
					}
				}
			}
			selector.Properties.RemoveAll(v => v == null);
		}
	}
}
