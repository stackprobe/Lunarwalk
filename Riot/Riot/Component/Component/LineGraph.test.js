function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	// later
	Riot_Event_Later(function() {

	@@_AddLine(
		coName + "_Main",
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
		"#f00"
		);

	@@_AddLine(
		coName + "_Main",
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
		"#0f0"
		);

	@@_AddLine(
		coName + "_Main",
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
		"#00f"
		);


	@@_Draw(coName + "_Main");

	}); // later
}

riot_main = riot_testmain;
