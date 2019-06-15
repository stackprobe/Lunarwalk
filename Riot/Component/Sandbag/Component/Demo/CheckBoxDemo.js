function @@_Loaded(coName) {
	Riot_Store.set(coName, {});
}

function @@_Shown(coName) {
	var group = Component_CheckBox_Group_New();

	Component_CheckBox_Group_SetSelectedCountMax(group, 1);

	Component_CheckBox_SetGroup(coName + "_A", group);
	Component_CheckBox_SetGroup(coName + "_B", group);
	Component_CheckBox_SetGroup(coName + "_C", group);
	Component_CheckBox_SetGroup(coName + "_D", group);
	Component_CheckBox_SetGroup(coName + "_E", group);
	Component_CheckBox_SetGroup(coName + "_F", group);

	Component_CheckBox_SetText(coName + "_A", "�I�����ڂ`");
	Component_CheckBox_SetText(coName + "_B", "�I�����ڂa");
	Component_CheckBox_SetText(coName + "_C", "�I�����ڂb");
	Component_CheckBox_SetText(coName + "_D", "�I�����ڂc");
	Component_CheckBox_SetText(coName + "_E", "�I�����ڂd");
	Component_CheckBox_SetText(coName + "_F", "�I�����ڂe");

	Component_GroupBox_SetPaddingRight(coName + "_Main2");

	Component_GroupBox_SetTitle(coName + "_Main2", "�`�F�b�N�{�b�N�X");

	group = Component_CheckBox_Group_New();

	Component_CheckBox_Group_SetSelectedCountMax(group, 3);

	Component_CheckBox_SetGroup(coName + "_M3A", group);
	Component_CheckBox_SetGroup(coName + "_M3B", group);
	Component_CheckBox_SetGroup(coName + "_M3C", group);
	Component_CheckBox_SetGroup(coName + "_M3D", group);
	Component_CheckBox_SetGroup(coName + "_M3E", group);
	Component_CheckBox_SetGroup(coName + "_M3F", group);

	Component_CheckBox_SetText(coName + "_M3A", "�I�����ڂ`");
	Component_CheckBox_SetText(coName + "_M3B", "�I�����ڂa");
	Component_CheckBox_SetText(coName + "_M3C", "�I�����ڂb");
	Component_CheckBox_SetText(coName + "_M3D", "�I�����ڂc");
	Component_CheckBox_SetText(coName + "_M3E", "�I�����ڂd");
	Component_CheckBox_SetText(coName + "_M3F", "�I�����ڂe");

	group = Component_CheckBox_Group_New();

	Component_CheckBox_Group_SetSelectedCountMax(group, 1);

	Component_CheckBox_SetGroup(coName + "_M4A", group);
	Component_CheckBox_SetGroup(coName + "_M4B", group);
	Component_CheckBox_SetGroup(coName + "_M4C", group);

	Component_CheckBox_SetText(coName + "_M4A", "Yes");
	Component_CheckBox_SetText(coName + "_M4B", "No");
	Component_CheckBox_SetText(coName + "_M4C", "�ǂ���ł��Ȃ�");

	// M5

	group = Component_CheckBox_Group_New();

	Component_CheckBox_Group_SetSelectedCountMax(group, 1);

	Component_CheckBox_SetGroup(coName + "_M5A", group);
	Component_CheckBox_SetGroup(coName + "_M5B", group);
	Component_CheckBox_SetGroup(coName + "_M5C", group);

	Component_CheckBox_SetRadioLook(coName + "_M5A");
	Component_CheckBox_SetRadioLook(coName + "_M5B");
	Component_CheckBox_SetRadioLook(coName + "_M5C");

	Component_CheckBox_SetText(coName + "_M5A", "Yes");
	Component_CheckBox_SetText(coName + "_M5B", "No");
	Component_CheckBox_SetText(coName + "_M5C", "�ǂ���ł��Ȃ�");

	// M6

	group = Component_CheckBox_Group_New();

	Component_CheckBox_Group_SetSelectedCountMax(group, 1);

	Component_CheckBox_SetGroup(coName + "_M6A", group);
	Component_CheckBox_SetGroup(coName + "_M6B", group);
	Component_CheckBox_SetGroup(coName + "_M6C", group);
	Component_CheckBox_SetGroup(coName + "_M6D", group);
	Component_CheckBox_SetGroup(coName + "_M6E", group);
	Component_CheckBox_SetGroup(coName + "_M6F", group);

	Component_CheckBox_SetRadioLook(coName + "_M6A");
	Component_CheckBox_SetRadioLook(coName + "_M6B");
	Component_CheckBox_SetRadioLook(coName + "_M6C");
	Component_CheckBox_SetRadioLook(coName + "_M6D");
	Component_CheckBox_SetRadioLook(coName + "_M6E");
	Component_CheckBox_SetRadioLook(coName + "_M6F");

	Component_CheckBox_SetText(coName + "_M6A", "�I�����ڂ`");
	Component_CheckBox_SetText(coName + "_M6B", "�I�����ڂa");
	Component_CheckBox_SetText(coName + "_M6C", "�I�����ڂb");
	Component_CheckBox_SetText(coName + "_M6D", "�I�����ڂc");
	Component_CheckBox_SetText(coName + "_M6E", "�I�����ڂd");
	Component_CheckBox_SetText(coName + "_M6F", "�I�����ڂe");
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	Riot_Store.delete(coName);
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Box");
}

function @@_Append(coName, tag) {
	Riot_Never();
}
