function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_Clear"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_AddItem"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_AddItemValue"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_AddItemText"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetValue"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_GetValue"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Value"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetError"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_ErrorMessage"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetWidth"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Width"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());

	@@^^_Button_SetText(coName + "_Clear",		"クリア");
	@@^^_Button_SetText(coName + "_AddItem",	"追加");
	@@^^_Button_SetText(coName + "_GetValue",	"取得");
	@@^^_Button_SetText(coName + "_SetValue",	"設定");
	@@^^_Button_SetText(coName + "_SetError",	"エラーメッセージ設定");
	@@^^_Button_SetText(coName + "_SetWidth",	"幅設定");

	@@^^_TextBox_SetText(coName + "_Width", "600");

	@@^^_Button_SetAction(coName + "_Clear",
		function() {
			@@^_Clear(coName + "_A");
		});
	@@^^_Button_SetAction(coName + "_AddItem",
		function() {
			var value = @@^^_TextBox_GetText(coName + "_AddItemValue");
			var text  = @@^^_TextBox_GetText(coName + "_AddItemText");

			@@^_AddItem(coName + "_A", value, text);
		});
	@@^^_Button_SetAction(coName + "_GetValue",
		function() {
			var value = @@^_GetValue(coName + "_A");

			@@^^_TextBox_SetText(coName + "_Value", value);
		});
	@@^^_Button_SetAction(coName + "_SetValue",
		function() {
			var value = @@^^_TextBox_GetText(coName + "_Value");

			@@^_SetValue(coName + "_A", value);
		});
	@@^^_Button_SetAction(coName + "_SetError",
		function() {
			var message = @@^^_TextBox_GetText(coName + "_ErrorMessage");

			@@^_SetError(coName + "_A", message);
		});
	@@^^_Button_SetAction(coName + "_SetWidth",
		function() {
			var w = parseInt(@@^^_TextBox_GetText(coName + "_Width"));

			@@^_SetWidth(coName + "_A", w);
		});
}

riot_main = riot_testmain;
