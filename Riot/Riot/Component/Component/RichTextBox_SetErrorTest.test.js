function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_DoSetError"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Message"));

	@@^^_Button_SetText(coName + "_DoSetError", "SetError");

	@@^^_Button_SetAction(coName + "_DoSetError",
		function() {
			var message = @@^^_TextBox_GetText(coName + "_Message");

			@@^_SetError(coName + "_A", message);
		});
}

riot_main = riot_testmain;
