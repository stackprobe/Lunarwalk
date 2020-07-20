function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	// later
	Riot_Event_Later(function() {

	@@_AddLine(
		coName + "_Main",
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
		"#f00"
		);

	@@_AddLine(
		coName + "_Main",
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
		"#0f0"
		);

	@@_AddLine(
		coName + "_Main",
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
		"#00f"
		);


	@@_Draw(coName + "_Main");

	}); // later
}

riot_main = riot_testmain;
