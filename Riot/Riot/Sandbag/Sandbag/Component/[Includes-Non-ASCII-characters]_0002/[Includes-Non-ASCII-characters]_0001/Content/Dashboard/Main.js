function @@_Loaded(coName) {
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_���i��Label"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_���i��"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_���i����Label"));
	Riot_Append(coName + "_Main", Component_RichTextBox_CreateElement(coName + "_���i����"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_�J�e�S��Label"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_�J�e�S��"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_�e�L�X�gALabel"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_�e�L�X�gA"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_�e�L�X�gBLabel"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_�e�L�X�gB"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Label_CreateElement(coName + "_�e�L�X�gCLabel"));
	Riot_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_�e�L�X�gC"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	Riot_Append(coName + "_Main", Component_Button_CreateElement(coName + "_Ok"));
	Riot_Append(coName + "_Main", Riot_WB());
	Riot_Append(coName + "_Main", Component_Button_CreateElement(coName + "_Cancel"));
	Riot_FloatEnd();
	Riot_Append(coName + "_Main", Riot_WB()); // for Riot_FloatEnd
}

function @@_Shown(coName) {
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
