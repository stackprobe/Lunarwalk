﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.StarBeat
{
	public interface IService
	{
		object Perform(HTTPRequest hr, ref string targetFile);
	}
}
