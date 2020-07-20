function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	{ // _Loaded

	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_���OLabel"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_���O"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_���O�J�iLabel"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_���O�J�i"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_�d�b�ԍ�Label"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_�d�b�ԍ�"));
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

	Component_Label_SetText(coName + "_���OLabel",			"���O�F");
	Component_Label_SetText(coName + "_���O�J�iLabel",		"���O�i�t���K�i�j�F");
	Component_Label_SetText(coName + "_�d�b�ԍ�Label",		"�d�b�ԍ��F");

	Component_TextBox_SetWidth(coName + "_�d�b�ԍ�", 300);

	Component_Calendar_SetCurrentAuto(coName + "_CalendarA");
	Component_Calendar_SetCurrentAuto(coName + "_CalendarB");
	Component_Calendar_SetCurrentAuto(coName + "_CalendarC");
	// old
	/*
	Component_Calendar_SetCurrentDate(coName + "_CalendarA", Riot_DateToDay_GetTodayDate());
	Component_Calendar_SetCurrentDate(coName + "_CalendarB", Riot_DateToDay_GetTodayDate());
	Component_Calendar_SetCurrentDate(coName + "_CalendarC", Riot_DateToDay_GetTodayDate());
	*/

	Component_Button_SetText(coName + "_Ok",		"�o�^");
	Component_Button_SetText(coName + "_Cancel",	"���~");

	Component_TextBox_AddChanged(coName + "_���O", function() {
		{
			var message = "";
			var text = Component_TextBox_GetText(coName + "_���O");

			if(Riot_ContainsChar(text, Riot_HALF)) {
				message = "���p�����͓��͏o���܂���B";
			}
			Component_TextBox_SetError(coName + "_���O", message);
		}
	});

	Component_TextBox_AddChanged(coName + "_���O�J�i", function() {
		{
			var message = "";
			var text = Component_TextBox_GetText(coName + "_���O�J�i");

			if(Riot_ContainsDisallowChar(text, Riot_MBC_KANA)) {
				message = "�S�p�J�i�̂ݓ��͏o���܂��B";
			}
			Component_TextBox_SetError(coName + "_���O�J�i", message);
		}
	});

	Component_TextBox_AddChanged(coName + "_�d�b�ԍ�", function() {
		{
			var message = "";
			var text = Component_TextBox_GetText(coName + "_�d�b�ԍ�");

			if(Riot_ContainsDisallowChar(text, Riot_DECIMAL)) {
				message = "���p�����̂ݓ��͏o���܂��B";
			}
			Component_TextBox_SetError(coName + "_�d�b�ԍ�", message);
		}
	});

	}); // _Shown
}

riot_main = riot_testmain;
