function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	{ // _Loaded

	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_名前Label"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_名前"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_名前カナLabel"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_名前カナ"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_電話番号Label"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_電話番号"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	Component_WhiteFrame_Append(coName + "_Main", Component_Calendar_CreateElement(coName + "_CalendarA"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Calendar_CreateElement(coName + "_CalendarB"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Calendar_CreateElement(coName + "_CalendarC"));
	Riot_FloatEnd();
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	Component_WhiteFrame_Append(coName + "_Main", Component_Button_CreateElement(coName + "_Ok"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Button_CreateElement(coName + "_Cancel"));
	Riot_FloatEnd();
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB()); // for Riot_FloatEnd

	} // _Loaded

	// _Shown
	Riot_Event_Later(function() {

	Component_Label_SetText(coName + "_名前Label",			"名前：");
	Component_Label_SetText(coName + "_名前カナLabel",		"名前（フリガナ）：");
	Component_Label_SetText(coName + "_電話番号Label",		"電話番号：");

	Component_TextBox_SetWidth(coName + "_電話番号", 300);

	Component_Calendar_SetCurrentAuto(coName + "_CalendarA");
	Component_Calendar_SetCurrentAuto(coName + "_CalendarB");
	Component_Calendar_SetCurrentAuto(coName + "_CalendarC");
	// old
	/*
	Component_Calendar_SetCurrentDate(coName + "_CalendarA", Riot_DateToDay_GetTodayDate());
	Component_Calendar_SetCurrentDate(coName + "_CalendarB", Riot_DateToDay_GetTodayDate());
	Component_Calendar_SetCurrentDate(coName + "_CalendarC", Riot_DateToDay_GetTodayDate());
	*/

	Component_Button_SetText(coName + "_Ok",		"登録");
	Component_Button_SetText(coName + "_Cancel",	"中止");

	Component_TextBox_AddChanged(coName + "_名前", function() {
		{
			var message = "";
			var text = Component_TextBox_GetText(coName + "_名前");

			if(Riot_ContainsChar(text, Riot_HALF)) {
				message = "半角文字は入力出来ません。";
			}
			Component_TextBox_SetError(coName + "_名前", message);
		}
	});

	Component_TextBox_AddChanged(coName + "_名前カナ", function() {
		{
			var message = "";
			var text = Component_TextBox_GetText(coName + "_名前カナ");

			if(Riot_ContainsDisallowChar(text, Riot_MBC_KANA)) {
				message = "全角カナのみ入力出来ます。";
			}
			Component_TextBox_SetError(coName + "_名前カナ", message);
		}
	});

	Component_TextBox_AddChanged(coName + "_電話番号", function() {
		{
			var message = "";
			var text = Component_TextBox_GetText(coName + "_電話番号");

			if(Riot_ContainsDisallowChar(text, Riot_DECIMAL)) {
				message = "半角数字のみ入力出来ます。";
			}
			Component_TextBox_SetError(coName + "_電話番号", message);
		}
	});

	}); // _Shown
}

riot_main = riot_testmain;
