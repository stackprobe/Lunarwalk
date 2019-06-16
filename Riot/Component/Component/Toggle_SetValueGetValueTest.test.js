function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_GetValue"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetValue"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Value"));

	@@^^_Button_SetText(coName + "_GetValue", "éÊìæ");
	@@^^_Button_SetText(coName + "_SetValue", "ê›íË");

	@@^^_Button_SetAction(coName + "_GetValue",
		function() {
			var value = @@^_GetValue(coName + "_A");

			@@^^_TextBox_SetText(coName + "_Value", value ? "true" : "false");
		});
	@@^^_Button_SetAction(coName + "_SetValue",
		function() {
			var value = @@^^_TextBox_GetText(coName + "_Value") == "true";

			@@^_SetValue(coName + "_A", value);
		});
}

riot_main = riot_testmain;
