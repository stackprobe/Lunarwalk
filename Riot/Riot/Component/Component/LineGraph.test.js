function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	// later
	Riot_Event_Later(function() {

	@@_AddLine(
		coName + "_Main",
		[
			Math.random() * 100.0, // 1月
			Math.random() * 100.0, // 2月
			Math.random() * 100.0, // 3月
			Math.random() * 100.0, // 4月
			Math.random() * 100.0, // 5月
			Math.random() * 100.0, // 6月
			Math.random() * 100.0, // 7月
			Math.random() * 100.0, // 8月
			Math.random() * 100.0, // 9月
			Math.random() * 100.0, // 10月
			Math.random() * 100.0, // 11月
			Math.random() * 100.0, // 12月
		],
		"#f00"
		);

	@@_AddLine(
		coName + "_Main",
		[
			Math.random() * 100.0, // 1月
			Math.random() * 100.0, // 2月
			Math.random() * 100.0, // 3月
			Math.random() * 100.0, // 4月
			Math.random() * 100.0, // 5月
			Math.random() * 100.0, // 6月
			Math.random() * 100.0, // 7月
			Math.random() * 100.0, // 8月
			Math.random() * 100.0, // 9月
			Math.random() * 100.0, // 10月
			Math.random() * 100.0, // 11月
			Math.random() * 100.0, // 12月
		],
		"#0f0"
		);

	@@_AddLine(
		coName + "_Main",
		[
			Math.random() * 100.0, // 1月
			Math.random() * 100.0, // 2月
			Math.random() * 100.0, // 3月
			Math.random() * 100.0, // 4月
			Math.random() * 100.0, // 5月
			Math.random() * 100.0, // 6月
			Math.random() * 100.0, // 7月
			Math.random() * 100.0, // 8月
			Math.random() * 100.0, // 9月
			Math.random() * 100.0, // 10月
			Math.random() * 100.0, // 11月
			Math.random() * 100.0, // 12月
		],
		"#00f"
		);


	@@_Draw(coName + "_Main");

	}); // later
}

riot_main = riot_testmain;
