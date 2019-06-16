var @@_ClickedCount = 0;

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
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Label_CreateElement(coName + "_ClickCount"));

	@@^^_Button_SetText(coName + "_GetText", "éÊìæ");
	@@^^_Button_SetText(coName + "_SetText", "ê›íË");

	@@^^_Button_SetAction(coName + "_GetText",
		function() {
			var text = @@^_GetText(coName + "_A");

			@@^^_TextBox_SetText(coName + "_Text", text);
		});
	@@^^_Button_SetAction(coName + "_SetText",
		function() {
			var text = @@^^_TextBox_GetText(coName + "_Text");

			@@^_SetText(coName + "_A", text);
		});

	@@^^_Label_SetText(coName + "_ClickCount", "0");

	// later
	Riot_Event_Later(function() {

	@@^_AddClicked(coName + "_A",
		function() {
			@@^^_Label_SetText(coName + "_ClickCount", "" + ++@@_ClickedCount);
		});

	}); // later
}

riot_main = riot_testmain;
