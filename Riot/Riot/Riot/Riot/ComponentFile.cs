using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Tools;
using Charlotte.Utils;
using Charlotte.DataModel;

namespace Charlotte
{
	public class ComponentFile
	{
		public string FilePath;
		public string CoName;
		public string CoNamePrefix;
		public TreeText Text;
		public TreeText CSSText;
		public HtmlDataModel Html;
		public CSSDataModel CSS;

		public ComponentFile(string file, string root)
		{
			this.FilePath = file;
			this.CoName = CommonUtils.PathToCoName(file, root);
			this.CoNamePrefix = CommonUtils.CoNameToCoNamePrefix(this.CoName);
			this.Text = new TreeText(file);
			this.CSSText = new TreeText(ComponentFileToCSSFile(file));

			Console.WriteLine("FilePath: " + this.FilePath);
			Console.WriteLine("CoName: " + this.CoName);
			Console.WriteLine("CoNamePrefix: " + this.CoNamePrefix);
			Console.WriteLine("Text: " + this.Text);
			Console.WriteLine("CSSText: " + this.CSSText);

			this.Html = new HtmlDataModel(this.Text);
			this.CSS = new CSSDataModel(this.CSSText);

			Console.WriteLine("Html: " + this.Html);
			Console.WriteLine("CSS: " + this.CSS);
		}

		private static string ComponentFileToCSSFile(string file)
		{
			return Path.Combine(Path.GetDirectoryName(file), StringTools.GetIsland(Path.GetFileName(file), ".").Left) + ".css.txt";
		}

		// ---- JS ----

		private const string JS_INDENT = "\t";

		private List<string[]> TagIDSuffixAddedIDSuffixPairs = new List<string[]>();
		private List<string> CallOtherComponentAppendCodes = new List<string>();
		private List<string> CallOtherComponentMethodCodes = new List<string>();

		public string GetJSCode()
		{
			this.TagIDSuffixAddedIDSuffixPairs.Clear(); // 2bs
			this.CallOtherComponentAppendCodes.Clear(); // 2bs
			this.CallOtherComponentMethodCodes.Clear(); // 2bs

			this.VarIndex = 0;
			JSCode code = this.GetJSCode(this.Html.Root);
			this.VarIndex = -1;

			List<string> dest = new List<string>();

			dest.Add("function " + this.CoNamePrefix + "CreateElement(coName) {");
			dest.AddRange(code.Lines);
			dest.Add(JS_INDENT + "Riot_Event_Early(function() {");

			foreach (string line in this.CallOtherComponentAppendCodes)
				dest.Add(line);

			dest.Add(JS_INDENT + "});");
			dest.Add(JS_INDENT + "Riot_Event_Add(function() {");

			foreach (string line in this.CallOtherComponentMethodCodes)
				dest.Add(line);

			dest.Add(JS_INDENT + "});");
			dest.Add(JS_INDENT + "Riot_PostCreateElement(coName, " + code.VarName + ", " + this.CoNamePrefix + "Loaded, " + this.CoNamePrefix + "Shown, " + this.CoNamePrefix + "Refresh, " + this.CoNamePrefix + "Destroy);");
			dest.Add(JS_INDENT + "return " + code.VarName + ";");
			dest.Add("}");
			dest.Add(""); // 空行

			dest.Add("function " + this.CoNamePrefix + "GetElements(coName) {");
			dest.Add(JS_INDENT + "return Riot_GetElements(coName, [");

			foreach (string[] pair in this.TagIDSuffixAddedIDSuffixPairs)
				dest.Add(JS_INDENT + JS_INDENT + "[ \"" + pair[0] + "\", \"" + pair[1] + "\" ],");

			dest.Add(JS_INDENT + "]);");
			dest.Add("}");

			this.TagIDSuffixAddedIDSuffixPairs.Clear();
			this.CallOtherComponentAppendCodes.Clear();
			this.CallOtherComponentMethodCodes.Clear();

			return FileTools.LinesToText(dest.ToArray());
		}

		private class JSCode
		{
			public string VarName;
			public string[] Lines;
			public bool NotUsingVar = false;
		}

		private int VarIndex = -1;

		private JSCode GetJSCode(HtmlDataModel.Tag rootTag)
		{
			JSCode code = new JSCode();

			code.VarName = "t" + this.VarIndex;
			this.VarIndex++;

			List<string> lines = new List<string>();
			string otherCoName = null;

			rootTag.IDSuffix = "";

			if (rootTag is HtmlDataModel.ScriptComponent)
			{
				string script = ((HtmlDataModel.ScriptComponent)rootTag).Script;

				script = CommonUtils.ResolveAlias(script, this.CoName);

				lines.Add(JS_INDENT + "var " + code.VarName + " = " + script);
			}
			else if (rootTag is HtmlDataModel.OCMethodCall)
			{
				otherCoName = CommonUtils.ResolveAlias(rootTag.Parent.Name, this.CoName);

				string methodName = rootTag.Name;
				string args2ndAndLater = ((HtmlDataModel.OCMethodCall)rootTag).Args2ndAndLater;
				string script;

				if (args2ndAndLater == null)
				{
					script = otherCoName + "_" + methodName + "(coName + \"_" + rootTag.Parent.ID + rootTag.Parent.IDSuffix + "\"); // " + code.VarName;
				}
				else
				{
					args2ndAndLater = CommonUtils.ResolveAlias(args2ndAndLater, this.CoName);

					script = otherCoName + "_" + methodName + "(coName + \"_" + rootTag.Parent.ID + rootTag.Parent.IDSuffix + "\", " + args2ndAndLater + "); // " + code.VarName;
				}

				this.CallOtherComponentMethodCodes.AddRange(new string[]
				{
					JS_INDENT + JS_INDENT + script,
				});

				lines.Add(JS_INDENT + "// " + script); // ToDouble 不要

				code.NotUsingVar = true;
			}
			else if (rootTag is HtmlDataModel.OtherComponent)
			{
				otherCoName = CommonUtils.ResolveAlias(rootTag.Name, this.CoName);

				if (rootTag.IDCollision)
					//idSuffix = "_" + CommonUtils.Unq(); // 重複したときだけ階層が増えてしまう。
					rootTag.IDSuffix = CommonUtils.Unq();

				this.TagIDSuffixAddedIDSuffixPairs.Add(new string[] { "_" + rootTag.ID, rootTag.IDSuffix });

				lines.Add(JS_INDENT + "var " + code.VarName + " = " + otherCoName + "_CreateElement(coName + \"_" + rootTag.ID + rootTag.IDSuffix + "\");");
			}
			else
			{
				if (rootTag.IDCollision)
					//idSuffix = "_" + CommonUtils.Unq(); // 重複したときだけ階層が増えてしまう。
					rootTag.IDSuffix = CommonUtils.Unq();

				this.TagIDSuffixAddedIDSuffixPairs.Add(new string[] { "_" + rootTag.ID, rootTag.IDSuffix });

				lines.Add(JS_INDENT + "var " + code.VarName + " = document.createElement(\"" + rootTag.Name + "\");");
				lines.Add(JS_INDENT + code.VarName + ".id = coName + \"_" + rootTag.ID + rootTag.IDSuffix + "\";");
				lines.Add(JS_INDENT + "Riot_SetClassName(" + code.VarName + ", \"" + this.CoNamePrefix + rootTag.ID + "\");");
				//lines.Add(JS_INDENT + code.VarName + ".className = \"" + this.CoNamePrefix + rootTag.ID + "\";"); // old
			}
			foreach (HtmlDataModel.Attribute attribute in rootTag.Attributes)
			{
				string attrName = attribute.Name;
				string attrValue = attribute.Value;

				attrValue = CommonUtils.ResolveAlias(attrValue, this.CoName);

				lines.Add(JS_INDENT + code.VarName + ".setAttribute(\"" + attrName + "\", \"" + attrValue + "\");");
			}
			foreach (HtmlDataModel.Property property in rootTag.Properties)
			{
				string propName = property.Name;
				string propValue = property.Value;

				propValue = CommonUtils.ResolveAlias(propValue, this.CoName);

				switch (property.Kind)
				{
					case HtmlDataModel.Property.Kind_e.REGULAR:
						lines.Add(JS_INDENT + code.VarName + "." + propName + " = \"" + propValue + "\";");
						break;

					case HtmlDataModel.Property.Kind_e.EVENT:
						lines.Add(JS_INDENT + code.VarName + "." + propName + " = function() { " + propValue + " };");
						break;

					default:
						throw null; // never
				}
			}
			foreach (HtmlDataModel.Tag tag in rootTag.Children)
			{
				int cocacInsertIndex = this.CallOtherComponentAppendCodes.Count;

				JSCode subCode = this.GetJSCode(tag);

				lines.AddRange(subCode.Lines);

				if (subCode.NotUsingVar)
				{
					//lines.Add(JS_INDENT + "// " + subCode.VarName); // HACK 不要
				}
				else if (rootTag is HtmlDataModel.OtherComponent)
				{
					this.CallOtherComponentAppendCodes.InsertRange(cocacInsertIndex, new string[]
					{
						//JS_INDENT + "Riot_Event_Early(function() {",
						JS_INDENT + JS_INDENT + otherCoName + "_Append(coName + \"_" + rootTag.ID + rootTag.IDSuffix + "\", " + subCode.VarName + ");",
						//JS_INDENT + "});",
					});
				}
				else
				{
					lines.Add(JS_INDENT + code.VarName + ".appendChild(" + subCode.VarName + ");");
				}
			}
			code.Lines = lines.ToArray();

			return code;
		}

		// ---- CSS ----

		private const string CSS_PROPERTY_INDENT = "\t";

		public string GetCSSCode()
		{
			List<string> lines = new List<string>();

			foreach (CSSDataModel.Selector selector in this.CSS.Selectors)
			{
				lines.Add("." + this.CoNamePrefix + selector.Name + " {");

				foreach (CSSDataModel.Property property in selector.Properties)
				{
					string propName = property.Name;
					string propValue = property.Value;

					propValue = CommonUtils.ResolveAlias(propValue, this.CoName);

					lines.Add(CSS_PROPERTY_INDENT + propName + ": " + propValue + ";");
				}
				lines.Add("}");
				lines.Add(""); // 空行
			}
			return FileTools.LinesToText(lines.ToArray());
		}

		// ---- 共通 ----

		// none

		// ----
	}
}
