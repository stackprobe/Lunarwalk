function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_DoShow"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_DoHide"));

	@@^^_Button_SetText(coName + "_DoShow", "Show");
	@@^^_Button_SetText(coName + "_DoHide", "Hide");

	@@^^_Button_SetAction(coName + "_DoShow", function() {
		@@^_Show(coName + "_A");
	});
	@@^^_Button_SetAction(coName + "_DoHide", function() {
		@@^_Hide(coName + "_A");
	});
}

riot_main = riot_testmain;
