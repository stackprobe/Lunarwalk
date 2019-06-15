function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	Riot_Event_Later(function() {

	@@_Append(coName + "_Main", @@^_Label_CreateElement(coName + "_Aラベル"));
	@@_Append(coName + "_Main", @@^_TextBox_CreateElement(coName + "_A"));
	@@_Append(coName + "_Main", Riot_WB());
	@@_Append(coName + "_Main", @@^_Label_CreateElement(coName + "_Bラベル"));
	@@_Append(coName + "_Main", @@^_TextBox_CreateElement(coName + "_B"));
	@@_Append(coName + "_Main", Riot_WB());
	@@_Append(coName + "_Main", @@^_Label_CreateElement(coName + "_Cラベル"));
	@@_Append(coName + "_Main", @@^_TextBox_CreateElement(coName + "_C"));
	@@_Append(coName + "_Main", Riot_WB());
	@@_Append(coName + "_Main", Riot_WB());

	@@^_Label_SetText(coName + "_Aラベル", "AAA");
	@@^_Label_SetText(coName + "_Bラベル", "BBBBBB");
	@@^_Label_SetText(coName + "_Cラベル", "CCCCCCCCC");

	// old
	/*
	@@^_TextBox_SetWidth(coName + "_A", 550);
	@@^_TextBox_SetWidth(coName + "_B", 550);
	@@^_TextBox_SetWidth(coName + "_C", 550);
	*/

	});
}

riot_main = riot_testmain;
