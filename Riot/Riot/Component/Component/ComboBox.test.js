function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	@@_AddItem(coName + "_Main", "1", "0001");
	@@_AddItem(coName + "_Main", "2", "0002");
	@@_AddItem(coName + "_Main", "3", "0003");
}

riot_main = riot_testmain;
