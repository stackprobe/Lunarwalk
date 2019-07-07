using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.StarBeat;
using Charlotte.Tools;

namespace Charlotte.Services
{
	public class Calc : IService
	{
		public object Perform(HTTPRequest hr, ref string targetFile)
		{
			ObjectTree tPrm = new ObjectTree(hr.Json);

			double v1 = double.Parse(tPrm[0].StringValue);
			string operation = tPrm[1].StringValue;
			double v2 = double.Parse(tPrm[2].StringValue);
			double ans;

			switch (operation)
			{
				case "ADD": ans = v1 + v2; break;
				case "SUB": ans = v1 - v2; break;
				case "MUL": ans = v1 * v2; break;
				case "DIV": ans = v1 / v2; break;

				default:
					throw new Exception("不明な演算子");
			}
			return "" + ans;
		}
	}
}
