using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Tools;
using Charlotte.DataModel;
using Charlotte.Utils;

namespace Charlotte
{
	public class CommonUtils
	{
		public static string GetRiotDir()
		{
			return ExtraTools.GetHomeDir("_riot");
		}

		public static string PathToCoName(string path, string root)
		{
			path = FileTools.ChangeRoot(path, root);
			path = Path.Combine(
				Path.GetDirectoryName(path),
				StringTools.GetIsland(Path.GetFileName(path), ".").Left
				);
			string coName = path.Replace('\\', '_');

			if (IsFairName(coName) == false)
				throw new Exception("不正なパスです。");

			return coName;
		}

		public static string CoNameToCoNamePrefix(string coName)
		{
			return coName + "_";
		}

		/// <summary>
		/// 本プログラム内での識別子として妥当であるかどうか判定する。
		/// </summary>
		/// <param name="coName">識別子</param>
		/// <returns>判定</returns>
		public static bool IsFairName(string coName, string extraAllowChars = "")
		{
			coName = IFN_FilterJChar(coName);
			return StringTools.LiteValidate(coName, StringTools.DECIMAL + StringTools.ALPHA + StringTools.alpha + "_" + extraAllowChars);
		}

		private static string IFN_FilterJChar(string str)
		{
			StringBuilder buff = new StringBuilder();

			foreach (char chr in str)
			{
				if (
					chr != '　' &&
					Ground.JChars.Contains(chr)
					)
					buff.Append("J");
				else
					buff.Append(chr);
			}
			return buff.ToString();
		}

		public static string ResolveAlias(string code, string coName)
		{
			for (int c = 1; ; c++)
			{
				if (30 < c)
					throw new Exception("ResolveAlias 周回数 多くね？");

				string codeNew = ResolveAliasMain(code, coName);

				if (codeNew == code)
					break;

				code = codeNew;
			}
			return code;
		}

		private static string ResolveAliasMain(string code, string coName)
		{
			code = ResolveCoName(code, coName);
			code = ResolveDefine(code);
			code = ResolveMacro(code);
			return code;
		}

		/// <summary>
		/// 名前空間参照の解決
		/// </summary>
		/// <param name="code">解決前コード</param>
		/// <param name="namePrefix">名前空間</param>
		/// <returns>解決後コード</returns>
		private static string ResolveCoName(string code, string coName)
		{
			List<string> ptns = new List<string>();

			// 置き換え対象書式 = @@, @@^, @@^^, @@^^^, ...

			// make ptns
			{
				string ptn = "@@";

				for (; ; )
				{
					ptns.Add(ptn);
					ptns.Add(coName);

					coName = CoNameToParent(coName);

					if (coName == null)
						break;

					ptn += "^";
				}
			}

			//Console.WriteLine("RN_PTNS=" + string.Join(":", ptns)); // test test test

			return StringTools.MultiReplace(code, ptns.ToArray());
		}

		public static string CoNameToParent(string name)
		{
			int index = name.LastIndexOf('_');

			if (index == -1)
				return null;

			return name.Substring(0, index);
		}

		/// <summary>
		/// 定義の解決
		/// </summary>
		/// <param name="code">解決前コード</param>
		/// <returns>解決後コード</returns>
		private static string ResolveDefine(string code)
		{
			List<string> ptns = new List<string>();

			// 置き換え対象書式 = @(xxx)

			// make ptns
			{
				foreach (DefineFile defineFile in Ground.DefineManager.DefineFiles)
				{
					foreach (DefineDataModel.Property property in defineFile.DefineData.Properties)
					{
						string propName = defineFile.NameToTrueName(property.Name);
						string propValue = property.Value;

						propName = "@(" + propName + ")";

						ptns.Add(propName);
						ptns.Add(propValue);
					}
				}
			}

			//Console.WriteLine("RD_PTNS=" + string.Join(":", ptns)); // test test test

			return StringTools.MultiReplace(code, ptns.ToArray());
		}

		private static int UnqCount = 0;

		public static string Unq()
		{
			return "CoUnq" + ++UnqCount;
		}

		private static string ResolveMacro(string code)
		{
			List<StringTools.ReplaceInfo> ptns = new List<StringTools.ReplaceInfo>();

			// 置き換え対象書式 = @(_xxx)

			int currLineNumber = 1;

			// make ptns
			{
				ptns.Add(new StringTools.ReplaceInfo()
				{
					OldValue = "@(_UNQ)",
					GetValueNew = () => Unq(),
					IgnoreCase = false,
				});

				ptns.Add(new StringTools.ReplaceInfo()
				{
					OldValue = "@(_PW9)",
					GetValueNew = () => SecurityTools.MakePassword_9(),
					IgnoreCase = false,
				});

				ptns.Add(new StringTools.ReplaceInfo() // for @(_LINE)
				{
					OldValue = "\n",
					GetValueNew = () =>
					{
						currLineNumber++;
						return "\n";
					},
					IgnoreCase = false,
				});

				ptns.Add(new StringTools.ReplaceInfo()
				{
					OldValue = "@(_LINE)",
					GetValueNew = () => "" + currLineNumber,
					IgnoreCase = false,
				});
			}

			return StringTools.MultiReplace(code, ptns.ToArray());
		}

		public static string ToHTMLNewLine(string text)
		{
#if true
			return text.Replace("\r", "").Replace("\n", "\r\n"); // CR-LF
#else
			return text.Replace("\r", ""); // LF only
#endif
		}

		public static bool SubstringIs(string str, int index, string ptn)
		{
			return index + ptn.Length <= str.Length && str.Substring(index, ptn.Length) == ptn;
		}
	}
}
