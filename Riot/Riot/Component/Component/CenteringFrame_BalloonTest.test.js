function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Balloon_CreateElement(coName + "_Main2"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_ShowBtn"));

	@@^^_Balloon_Append(coName + "_Main2", @@^_CreateElement(coName + "_A"));

	@@^_Append(coName + "_A", Component_ImageSelector_CreateElement(coName + "_B"));
	@@^_SetWidth(coName + "_A", 560);
	@@^_SetHeight(coName + "_A", 360);

	@@^^_Button_SetAction(coName + "_ShowBtn", function() {
		@@^^_Balloon_Show(coName + "_Main2");
	});
}

riot_main = riot_testmain;
