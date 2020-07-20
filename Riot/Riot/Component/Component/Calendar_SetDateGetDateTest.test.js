function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	Component_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Button_CreateElement(coName + "_GetDate"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Button_CreateElement(coName + "_SetDate"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_Date"));

	Component_Button_SetText(coName + "_GetDate", "éÊìæ");
	Component_Button_SetText(coName + "_SetDate", "ê›íË");

	Component_Button_SetAction(coName + "_GetDate",
		function() {
			var date = @@^_GetDate(coName + "_A");

			Component_TextBox_SetText(coName + "_Date", "" + date);
		});
	Component_Button_SetAction(coName + "_SetDate",
		function() {
			var date = parseInt(Component_TextBox_GetText(coName + "_Date"));

			@@^_SetDate(coName + "_A", date);
		});
}

riot_main = riot_testmain;
