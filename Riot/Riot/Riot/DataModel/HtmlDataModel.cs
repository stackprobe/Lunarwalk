using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Utils;
using Charlotte.Tools;

namespace Charlotte.DataModel
{
	public class HtmlDataModel
	{
		public class Tag
		{
			public string Name;
			public string ID;
			public Tag Parent; // null == root
			public List<Tag> Children = new List<Tag>();
			public List<Attribute> Attributes = new List<Attribute>();
			public List<Property> Properties = new List<Property>();
			public bool IDCollision = false;
			public string IDSuffix = null;
		}

		public class OtherComponent : Tag
		{ }

		public class ScriptComponent : OtherComponent
		{
			public string Script;
		}

		public class OCMethodCall : Tag // Other Component's Method Call
		{
			public string Args2ndAndLater; // null == ２つ目以降の引数無し
		}

		public class Attribute
		{
			public string Name;
			public string Value; // 自由な文字列
			public Tag Parent;
		}

		public class Property
		{
			public enum Kind_e
			{
				REGULAR,
				EVENT,
			}

			public Kind_e Kind = Kind_e.REGULAR;
			public string Name;
			public string Value; // 自由な文字列
			public Tag Parent;
		}

		public TreeText Source;
		public Tag Root;

		public HtmlDataModel(TreeText src)
		{
			this.Source = src;

			if (src.Root.Children.Count != 1)
				src.Root.ErrorChecker().Error("コンポーネントのルートタグは１つでなければなりません。");

			this.Root = this.LoadTag(src.Root.Children[0], null);
			this.PostLoad();
		}

		private Tag LoadTag(TreeText.Node root, Tag parent)
		{
			if (root.Line[0] == '.')
				root.ErrorChecker().Error("コンポーネントのルートは属性であってはなりません。");

			if (root.Line[0] == '@')
				root.ErrorChecker().Error("コンポーネントのルートはプロパティであってはなりません。");

			if (root.Line[0] == '!')
				root.ErrorChecker().Error("コンポーネントのルートはイベントであってはなりません。");

			if (root.Line.StartsWith("/!")) // スクリプト
			{
				if (1 <= root.Children.Count)
					root.ErrorChecker().Error("スクリプトの配下は空でなければなりません。");

				string script = root.Line.Substring(2);

				// script ⇒ 自由な文字列

				return new ScriptComponent()
				{
					Script = script,
				};
			}

			string[] tokens;

			if (root.Line.StartsWith("/.")) // メソッド呼び出し
			{
				if (1 <= root.Children.Count)
					root.ErrorChecker().Error("メソッド呼び出しの配下は空でなければなりません。");

				if (parent is OtherComponent == false)
					root.ErrorChecker().Error("メソッド呼び出しは別コンポーネント参照に対して使用出来ます。");

				string methodCall = root.Line.Substring(2);
				tokens = methodCall.Split(new char[] { ' ' }, 2);
				string methodName;
				string args2ndAndLater;

				switch (tokens.Length)
				{
					case 1:
						methodName = tokens[0];
						args2ndAndLater = null;
						break;

					case 2:
						methodName = tokens[0];
						args2ndAndLater = tokens[1];
						break;

					default:
						throw null; // never
				}

				root.ErrorChecker().CheckFairName(methodName);
				// args2ndAndLater ⇒ 自由な文字列

				return new OCMethodCall()
				{
					Name = methodName,
					Args2ndAndLater = args2ndAndLater,
					Parent = parent,
				};
			}

			tokens = root.Line.Split(new char[] { ' ' }, 2);

			if (tokens.Length != 2)
				root.ErrorChecker().Error("コンポーネントの行は２つのトークンでなければなりません。");

			string tagName = tokens[0];
			string tagID = tokens[1];

			Tag tag;

			if (tagName[0] == '/') // 別コンポーネント参照
			{
				if (parent == null)
					root.ErrorChecker().Error("ルートタグを別コンポーネント参照には出来ません。");

				string referenceName = tagName.Substring(1);

				root.ErrorChecker().CheckFairName(referenceName, "@^");
				root.ErrorChecker().CheckFairName(tagID);

				tag = new OtherComponent()
				{
					Name = referenceName,
					ID = tagID,
					Parent = parent,
				};

				foreach (TreeText.Node node in root.Children)
				{
					tag.Children.Add(this.LoadTag(node, tag));
				}
				return tag;
			}

			root.ErrorChecker().CheckFairName(tagName);
			root.ErrorChecker().CheckFairName(tagID);

			tag = new Tag()
			{
				Name = tagName,
				ID = tagID,
				Parent = parent,
			};

			foreach (TreeText.Node node in root.Children)
			{
				if (node.Line[0] == '.') // 属性
				{
					if (node.Children.Count != 1)
						node.ErrorChecker().Error("属性の配下は１つの属性値でなければなりません。");

					if (node.Children[0].Children.Count != 0)
						node.ErrorChecker().Error("属性値の配下は空でなければなりません。");

					string attrName = node.Line.Substring(1);
					string attrValue = node.Children[0].Line;

					node.ErrorChecker().CheckFairName(attrName);
					// attrValue ⇒ 自由な文字列

					tag.Attributes.Add(new Attribute()
					{
						Name = attrName,
						Value = attrValue,
						Parent = tag,
					});
				}
				else if (node.Line[0] == '@') // プロパティ
				{
					if (node.Children.Count != 1)
						node.ErrorChecker().Error("プロパティの配下は１つのプロパティ値でなければなりません。");

					if (node.Children[0].Children.Count != 0)
						node.ErrorChecker().Error("プロパティ値の配下は空でなければなりません。");

					string propName = node.Line.Substring(1);
					string propValue = node.Children[0].Line;

					node.ErrorChecker().CheckFairName(propName);
					// propValue ⇒ 自由な文字列

					tag.Properties.Add(new Property()
					{
						Name = propName,
						Value = propValue,
						Parent = tag,
					});
				}
				else if (node.Line[0] == '!') // イベント
				{
					if (node.Children.Count != 1)
						node.ErrorChecker().Error("イベント名の配下は１つのプロパティ値でなければなりません。");

					if (node.Children[0].Children.Count != 0)
						node.ErrorChecker().Error("スクリプトの配下は空でなければなりません。");

					string propName = node.Line.Substring(1);
					string propValue = node.Children[0].Line;

					node.ErrorChecker().CheckFairName(propName);
					// propValue ⇒ 自由な文字列

					tag.Properties.Add(new Property()
					{
						Kind = Property.Kind_e.EVENT,
						Name = propName,
						Value = propValue,
						Parent = tag,
					});
				}
				else
				{
					tag.Children.Add(this.LoadTag(node, tag));
				}
			}
			return tag;
		}

		private void PostLoad()
		{
			this.ResolveSameID();
			//this.CheckSameID();
		}

		private void ResolveSameID()
		{
			List<Tag> tags = this.GetAllTag();

			for (int index = tags.Count - 2; 0 <= index; index--)
			{
				for (int ndx = tags.Count - 1; index < ndx; ndx--)
				{
					if (tags[index].ID == tags[ndx].ID)
					{
						tags[index].IDCollision = true;
						tags[ndx].IDCollision = true;
					}
				}
			}
		}

		private void CheckSameID()
		{
			List<Tag> tags = this.GetAllTag();

			for (int index = 0; index < tags.Count; index++)
			{
				for (int ndx = 0; ndx < index; ndx++)
				{
					Tag a = tags[ndx];
					Tag b = tags[index];

					if (a.ID == b.ID)
					{
						this.Source.ErrorChecker().Error("タグＩＤの衝突です。" + a.ID);
					}
				}
			}
		}

		private List<Tag> GetAllTag()
		{
			List<Tag> dest = new List<Tag>();
			this.CollectTag(this.Root, dest);
			return dest;
		}

		private void CollectTag(Tag rootTag, List<Tag> dest)
		{
			dest.Add(rootTag);

			foreach (Tag tag in rootTag.Children)
			{
				CollectTag(tag, dest);
			}
		}
	}
}
