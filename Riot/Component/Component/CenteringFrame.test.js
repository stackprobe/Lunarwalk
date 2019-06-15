function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	Component_CenteringFrame_Append(coName + "_Main", Component_Button_CreateElement(coName + "_Btn"));
}

riot_main = riot_testmain;
