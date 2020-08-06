function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	{ // _Loaded

	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_���i��Label"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_���i��"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_���i����Label"));
	Component_WhiteFrame_Append(coName + "_Main", Component_RichTextBox_CreateElement(coName + "_���i����"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_�J�e�S��Label"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_�J�e�S��"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_�e�L�X�gALabel"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_�e�L�X�gA"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_�e�L�X�gBLabel"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_�e�L�X�gB"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_�e�L�X�gCLabel"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_�e�L�X�gC"));
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

	Component_Label_SetText(coName + "_���i��Label",		"���i���F");
	Component_Label_SetText(coName + "_���i����Label",		"���i�����F");
	Component_Label_SetText(coName + "_�J�e�S��Label",		"�J�e�S���F");
	Component_Label_SetText(coName + "_�e�L�X�gALabel",		"�e�L�X�g�`�F");
	Component_Label_SetText(coName + "_�e�L�X�gBLabel",		"�e�L�X�g�a�F");
	Component_Label_SetText(coName + "_�e�L�X�gCLabel",		"�e�L�X�g�b�F");

	Component_TextBox_SetWidth(coName + "_�e�L�X�gA", 400);
//	Component_TextBox_SetWidth(coName + "_�e�L�X�gB", 600);
	Component_TextBox_SetWidth(coName + "_�e�L�X�gC", 800);

	Component_Button_SetText(coName + "_Ok",		"���M");
	Component_Button_SetText(coName + "_Cancel",	"�L�����Z��");

	Component_Button_SetAction(coName + "_Ok", function() {
		{
			var message = "";

			if(Component_TextBox_GetText(coName + "_���i��") == "") {
				message = "���i������͂��ĉ������B";
			}
			Component_TextBox_SetError(coName + "_���i��", message);
		}

		{
			var message = "";

			if(Component_RichTextBox_GetText(coName + "_���i����") == "") {
				message = "���i��������͂��ĉ������B";
			}
			Component_RichTextBox_SetError(coName + "_���i����", message);
		}

		{
			var message = "";

			if(Component_TextBox_GetText(coName + "_�J�e�S��") == "") {
				message = "�J�e�S������͂��ĉ������B";
			}
			Component_TextBox_SetError(coName + "_�J�e�S��", message);
		}

		{
			var message = "";

			if(Component_TextBox_GetText(coName + "_�e�L�X�gA") == "") {
				message = "�e�L�X�g�`����͂��ĉ������B";
			}
			Component_TextBox_SetError(coName + "_�e�L�X�gA", message);
		}

		{
			var message = "";

			if(Component_TextBox_GetText(coName + "_�e�L�X�gB") == "") {
				message = "�e�L�X�g�a����͂��ĉ������B";
			}
			Component_TextBox_SetError(coName + "_�e�L�X�gB", message);
		}

		{
			var message = "";

			if(Component_TextBox_GetText(coName + "_�e�L�X�gC") == "") {
				message = "�e�L�X�g�b����͂��ĉ������B";
			}
			Component_TextBox_SetError(coName + "_�e�L�X�gC", message);
		}
	});

	Component_Button_SetAction(coName + "_Cancel", function() {
		Component_TextBox_SetError(coName + "_���i��", "");
		Component_RichTextBox_SetError(coName + "_���i����", "");
		Component_TextBox_SetError(coName + "_�J�e�S��", "");
		Component_TextBox_SetError(coName + "_�e�L�X�gA", "");
		Component_TextBox_SetError(coName + "_�e�L�X�gB", "");
		Component_TextBox_SetError(coName + "_�e�L�X�gC", "");
	});

	}); // _Shown
}

riot_main = riot_testmain;
