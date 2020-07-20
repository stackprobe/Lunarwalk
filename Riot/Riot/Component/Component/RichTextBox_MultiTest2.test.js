function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_B"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_C"));

//	@@^_SetWidth(coName + "_A", 600);
	@@^_SetWidth(coName + "_B", 700);
	@@^_SetWidth(coName + "_C", 800);

//	@@^_SetHeight(coName + "_A", 200);
	@@^_SetHeight(coName + "_B", 300);
	@@^_SetHeight(coName + "_C", 400);
}

riot_main = riot_testmain;
