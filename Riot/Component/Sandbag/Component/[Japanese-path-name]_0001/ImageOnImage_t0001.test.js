function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	Component_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_Main2"));
}

riot_main = riot_testmain;
