function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_GetText"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetText"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Text"));

	@@^^_Button_SetText(coName + "_GetText", "éÊìæ");
	@@^^_Button_SetText(coName + "_SetText", "ê›íË");

	@@^^_Button_SetAction(coName + "_GetText",
		function() {
			var text = @@^_GetText(coName + "_A");

			text = Riot_Replace(text, "\t", "(HT)");
			text = Riot_Replace(text, "\r", "(CR)");
			text = Riot_Replace(text, "\n", "(LF)");

			@@^^_TextBox_SetText(coName + "_Text", text);
		});
	@@^^_Button_SetAction(coName + "_SetText",
		function() {
			var text = @@^^_TextBox_GetText(coName + "_Text");

			text = Riot_Replace(text, "(HT)", "\t");
			text = Riot_Replace(text, "(CR)", "\r");
			text = Riot_Replace(text, "(LF)", "\n");

			@@^_SetText(coName + "_A", text);
		});
}

riot_main = riot_testmain;
