function @@_Loaded(coName) {
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_名前Label"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_名前"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_名前カナLabel"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_名前カナ"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_電話番号Label"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_電話番号"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	Riot_Append(coName + "_Main", Component_Calendar_CreateElement(coName + "_CalendarA"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Calendar_CreateElement(coName + "_CalendarB"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Calendar_CreateElement(coName + "_CalendarC"));
	Riot_FloatEnd();
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	Riot_Append(coName + "_Main", Component_Button_CreateElement(coName + "_Ok"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Button_CreateElement(coName + "_Cancel"));
	Riot_FloatEnd();
	Riot_Append(coName + "_Main", Riot_WB()); // for Riot_FloatEnd
}

function @@_Shown(coName) {
	Component_Label_SetText(coName + "_名前Label",			"名前：");
	Component_Label_SetText(coName + "_名前カナLabel",		"名前（フリガナ）：");
	Component_Label_SetText(coName + "_電話番号Label",		"電話番号：");

	Component_TextBox_SetWidth(coName + "_電話番号", 300);

	Component_Calendar_SetDate(coName + "_CalendarA", Riot_DateToDay_GetTodayDate());
	Component_Calendar_SetDate(coName + "_CalendarB", Riot_DateToDay_GetTodayDate());
	Component_Calendar_SetDate(coName + "_CalendarC", Riot_DateToDay_GetTodayDate());

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
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	// noop
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Main");
}

function @@_Append(coName, tag) {
	Riot_Never();
}
