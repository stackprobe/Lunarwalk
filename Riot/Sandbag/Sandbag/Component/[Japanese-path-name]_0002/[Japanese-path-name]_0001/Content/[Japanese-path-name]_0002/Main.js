function @@_Loaded(coName) {
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_���OLabel"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_���O"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_���O�J�iLabel"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_���O�J�i"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_�d�b�ԍ�Label"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_�d�b�ԍ�"));
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
	Component_Label_SetText(coName + "_���OLabel",			"���O�F");
	Component_Label_SetText(coName + "_���O�J�iLabel",		"���O�i�t���K�i�j�F");
	Component_Label_SetText(coName + "_�d�b�ԍ�Label",		"�d�b�ԍ��F");

	Component_TextBox_SetWidth(coName + "_�d�b�ԍ�", 300);

	Component_Calendar_SetDate(coName + "_CalendarA", Riot_DateToDay_GetTodayDate());
	Component_Calendar_SetDate(coName + "_CalendarB", Riot_DateToDay_GetTodayDate());
	Component_Calendar_SetDate(coName + "_CalendarC", Riot_DateToDay_GetTodayDate());

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
