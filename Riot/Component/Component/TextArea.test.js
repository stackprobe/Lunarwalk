function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));
}

riot_main = riot_testmain;
