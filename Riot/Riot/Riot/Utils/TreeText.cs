using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Tools;
using System.IO;

namespace Charlotte.Utils
{
	public class TreeText
	{
		public class Node
		{
			public SourceLineInfo LineInfo;
			public string Line;
			public Node Parent;
			public List<Node> Children = new List<Node>();

			public ErrorChecker ErrorChecker()
			{
				return this.LineInfo.ErrorChecker();
			}
		}

		public Node Root = new Node()
		{
			LineInfo = null,
			Line = null,
			Parent = null,
		};

		public string FilePath;

		public TreeText(string file)
		{
			Console.WriteLine("[TreeText_ctor] " + file);

			this.FilePath = file;

			string text = File.ReadAllText(file, StringTools.ENCODING_SJIS);
			string[] lines = FileTools.TextToLines(text);
			List<SourceLine> sLines = new List<SourceLine>();

			for (int index = 0; index < lines.Length; index++)
			{
				sLines.Add(new SourceLine()
				{
					Info = new SourceLineInfo()
					{
						FilePath = file,
						LineNumber = index + 1,
					},
					Entity = lines[index],
				});
			}
			EraseCommentLines(sLines);

			this.ParseTree(sLines);
		}

		private static void EraseCommentLines(List<SourceLine> sLines)
		{
			for (int index = sLines.Count - 1; 0 <= index; index--)
			{
				string tLine = sLines[index].Entity.Trim();

				if (tLine == "" || tLine[0] == ';')
				{
					sLines.RemoveAt(index);
				}
			}
		}

		private void ParseTree(List<SourceLine> sLines)
		{
			Node node = this.Root;
			int indent = 0;

			foreach (SourceLine sLine in sLines)
			{
				int indentNew = GetIndent(sLine.Entity);

				if (indent < indentNew)
					throw new Exception();

				for (; indentNew < indent; indent--)
					node = node.Parent;

				sLine.Entity = sLine.Entity.Trim();

				Node nodeNew = new Node()
				{
					LineInfo = sLine.Info,
					Line = sLine.Entity,
					Parent = node,
				};

				node.Children.Add(nodeNew);
				node = nodeNew;
				indent++;
			}
		}

		private static int GetIndent(string line)
		{
			int index = 0;

			for (; line[index] == '\t'; index++)
			{ }

			if (line[index] <= ' ')
				throw new Exception();

			return index;
		}

		public ErrorChecker ErrorChecker()
		{
			return new ErrorChecker(message => { throw new Exception(this.FilePath + " 行番号不明 ⇒ " + message); });
		}
	}
}
