function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_GetDateTime"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetDateTime"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Text"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetError"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_ErrorMessage"));

	@@^^_Button_SetText(coName + "_GetDateTime", "éÊìæ");
	@@^^_Button_SetText(coName + "_SetDateTime", "ê›íË");

	@@^^_TextBox_SetText(coName + "_Text", "0");

	@@^^_Button_SetAction(coName + "_GetDateTime",
		function() {
			var text = "" + @@^_GetDateTime(coName + "_A");

			@@^^_TextBox_SetText(coName + "_Text", text);
		});
	@@^^_Button_SetAction(coName + "_SetDateTime",
		function() {
			var text = @@^^_TextBox_GetText(coName + "_Text");

			@@^_SetDateTime(coName + "_A", parseInt(text));
		});

	@@^^_Button_SetText(coName + "_SetError", "ÉGÉâÅ[ê›íË");

	@@^^_Button_SetAction(coName + "_SetError",
		function() {
			var message = @@^^_TextBox_GetText(coName + "_ErrorMessage");

			@@^_SetError(coName + "_A", message);
		});
}

riot_main = riot_testmain;
