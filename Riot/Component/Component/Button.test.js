function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	@@_SetText(coName + "_Main", "押して下さい");
	@@_SetAction(coName + "_Main", function() { alert("ボタンが押されました。"); });
}

riot_main = riot_testmain;
