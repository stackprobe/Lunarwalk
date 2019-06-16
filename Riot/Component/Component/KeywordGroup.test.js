function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	Component_WhiteFrame_Append(coName + "_Main", @@_CreateElement(coName + "_Main2"));

	@@_AddKeyword(coName + "_Main2", "キーワードＡ");
	@@_AddKeyword(coName + "_Main2", "キーワードＢＢ");
	@@_AddKeyword(coName + "_Main2", "キーワードＣＣＣ");
	@@_AddKeyword(coName + "_Main2", "1");
	@@_AddKeyword(coName + "_Main2", "2");
	@@_AddKeyword(coName + "_Main2", "3");
	@@_AddKeyword(coName + "_Main2", "日");
	@@_AddKeyword(coName + "_Main2", "月");
	@@_AddKeyword(coName + "_Main2", "火");
	@@_AddKeyword(coName + "_Main2", "水");
	@@_AddKeyword(coName + "_Main2", "木");
	@@_AddKeyword(coName + "_Main2", "金");
	@@_AddKeyword(coName + "_Main2", "土");
}

riot_main = riot_testmain;
