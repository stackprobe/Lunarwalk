function @@_Loaded(coName) {
	Riot_Append(coName + "_Main", Component_LineGraph_CreateElement(coName + "_GraphA"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_LineGraph_CreateElement(coName + "_GraphB"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_LineGraph_CreateElement(coName + "_GraphC"));
	Riot_Append(coName + "_Main", Riot_WB());
}

function @@_Shown(coName) {
	{
		var cs =
		[
			"#03f",
			"#05d",
			"#07b",
			"#099",
			"#0b7",
			"#0d5",
			"#0f3",
		];

		for(var i = 1; i < cs.length; i++) {
			Component_LineGraph_AddLine(
				coName + "_GraphA",
				[
					Math.random() * 100.0, // 1��
					Math.random() * 100.0, // 2��
					Math.random() * 100.0, // 3��
					Math.random() * 100.0, // 4��
					Math.random() * 100.0, // 5��
					Math.random() * 100.0, // 6��
					Math.random() * 100.0, // 7��
					Math.random() * 100.0, // 8��
					Math.random() * 100.0, // 9��
					Math.random() * 100.0, // 10��
					Math.random() * 100.0, // 11��
					Math.random() * 100.0, // 12��
				],
				cs[i]
				);
		}

		Component_LineGraph_Draw(coName + "_GraphA");
	}

	{
		var info = Component_LineGraph_GetInfo(coName + "_GraphB");

		info.XMin = -100;
		info.XStep = 50;
		info.XCount = 5;
		info.XSuffix = "";

		info.YMin = -100;
		info.YMax = 100;
		info.YDivCount = 4;
		info.YSuffix = "";

		info.W = 750;
		info.H = 750;

		var cs =
		[
			"#f44",
			"#c33",
			"#922",
			"#611",
		];

		for(var i = 1; i < cs.length; i++) {
			Component_LineGraph_AddLine(
				coName + "_GraphB",
				[
					Math.random() * 200.0 - 100.0,
					Math.random() * 200.0 - 100.0,
					Math.random() * 200.0 - 100.0,
					Math.random() * 200.0 - 100.0,
					Math.random() * 200.0 - 100.0,
				],
				cs[i]
				);
		}

		Component_LineGraph_Draw(coName + "_GraphB");
	}

	{
		var info = Component_LineGraph_GetInfo(coName + "_GraphC");

		info.XMin = 0;
		info.XStep = 20;
		info.XCount = 20;
		info.XSuffix = "";

		info.YMin = 0;
		info.YMax = 1000;
		info.YDivCount = 5;
		info.YSuffix = "";

		info.W = 900;
		info.H = 400;

		var cs =
		[
			"#ccc",
			"#999",
			"#666",
			"#333",
		];

		for(var i = 1; i < cs.length; i++) {
			Component_LineGraph_AddLine(
				coName + "_GraphC",
				[
					Math.random() * 1000.0, Math.random() * 1000.0, Math.random() * 1000.0, Math.random() * 1000.0,
					Math.random() * 1000.0, Math.random() * 1000.0, Math.random() * 1000.0, Math.random() * 1000.0,
					Math.random() * 1000.0, Math.random() * 1000.0, Math.random() * 1000.0, Math.random() * 1000.0,
					Math.random() * 1000.0, Math.random() * 1000.0, Math.random() * 1000.0, Math.random() * 1000.0,
					Math.random() * 1000.0, Math.random() * 1000.0, Math.random() * 1000.0, Math.random() * 1000.0,
				],
				cs[i]
				);
		}

		Component_LineGraph_Draw(coName + "_GraphC");
	}
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	// noop
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Main");
}

function @@_Append(coName, tag) {
	Riot_Never();
}
