function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	Component_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_B"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_C"));
}

riot_main = riot_testmain;
