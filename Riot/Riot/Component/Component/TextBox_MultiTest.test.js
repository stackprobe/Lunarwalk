function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_B"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_C"));
}

riot_main = riot_testmain;
