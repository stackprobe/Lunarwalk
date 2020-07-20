function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	Component_WhiteFrame_Append(coName + "_Main", Component_LineGraph_CreateElement(coName + "_GraphA"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_LineGraph_CreateElement(coName + "_GraphB"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_LineGraph_CreateElement(coName + "_GraphC"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());

	// later
	Riot_Event_Later(function() {

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
					Math.random() * 100.0, // 1ŒŽ
					Math.random() * 100.0, // 2ŒŽ
					Math.random() * 100.0, // 3ŒŽ
					Math.random() * 100.0, // 4ŒŽ
					Math.random() * 100.0, // 5ŒŽ
					Math.random() * 100.0, // 6ŒŽ
					Math.random() * 100.0, // 7ŒŽ
					Math.random() * 100.0, // 8ŒŽ
					Math.random() * 100.0, // 9ŒŽ
					Math.random() * 100.0, // 10ŒŽ
					Math.random() * 100.0, // 11ŒŽ
					Math.random() * 100.0, // 12ŒŽ
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

	}); // later
}

riot_main = riot_testmain;
