function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_GetImage"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetImage"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextArea_CreateElement(coName + "_Image"));

	@@^^_Button_SetText(coName + "_GetImage", "éÊìæ");
	@@^^_Button_SetText(coName + "_SetImage", "ê›íË");

	@@^^_Button_SetAction(coName + "_GetImage",
		function() {
			var image = @@^_GetImage(coName + "_A");

			@@^^_TextBox_SetText(coName + "_Image", image);
		});
	@@^^_Button_SetAction(coName + "_SetImage",
		function() {
			var image = @@^^_TextBox_GetText(coName + "_Image");

			@@^_SetImage(coName + "_A", image);
		});
}

riot_main = riot_testmain;
