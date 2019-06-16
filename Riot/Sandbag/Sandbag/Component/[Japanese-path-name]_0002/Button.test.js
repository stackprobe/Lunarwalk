function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	@@_SetText(coName + "_Main", "‰Ÿ‚µ‚Ä‰º‚³‚¢");
	@@_SetAction(coName + "_Main", function() { alert("ƒ{ƒ^ƒ“‚ª‰Ÿ‚³‚ê‚Ü‚µ‚½B"); });

	// later
	Riot_Event_Later(function() {

	});
}

riot_main = riot_testmain;
