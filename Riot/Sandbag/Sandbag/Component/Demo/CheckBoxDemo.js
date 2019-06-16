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

	Component_CheckBox_SetText(coName + "_A", "選択項目Ａ");
	Component_CheckBox_SetText(coName + "_B", "選択項目Ｂ");
	Component_CheckBox_SetText(coName + "_C", "選択項目Ｃ");
	Component_CheckBox_SetText(coName + "_D", "選択項目Ｄ");
	Component_CheckBox_SetText(coName + "_E", "選択項目Ｅ");
	Component_CheckBox_SetText(coName + "_F", "選択項目Ｆ");

	Component_GroupBox_SetPaddingRight(coName + "_Main2");

	Component_GroupBox_SetTitle(coName + "_Main2", "チェックボックス");

	group = Component_CheckBox_Group_New();

	Component_CheckBox_Group_SetSelectedCountMax(group, 3);

	Component_CheckBox_SetGroup(coName + "_M3A", group);
	Component_CheckBox_SetGroup(coName + "_M3B", group);
	Component_CheckBox_SetGroup(coName + "_M3C", group);
	Component_CheckBox_SetGroup(coName + "_M3D", group);
	Component_CheckBox_SetGroup(coName + "_M3E", group);
	Component_CheckBox_SetGroup(coName + "_M3F", group);

	Component_CheckBox_SetText(coName + "_M3A", "選択項目Ａ");
	Component_CheckBox_SetText(coName + "_M3B", "選択項目Ｂ");
	Component_CheckBox_SetText(coName + "_M3C", "選択項目Ｃ");
	Component_CheckBox_SetText(coName + "_M3D", "選択項目Ｄ");
	Component_CheckBox_SetText(coName + "_M3E", "選択項目Ｅ");
	Component_CheckBox_SetText(coName + "_M3F", "選択項目Ｆ");

	group = Component_CheckBox_Group_New();

	Component_CheckBox_Group_SetSelectedCountMax(group, 1);

	Component_CheckBox_SetGroup(coName + "_M4A", group);
	Component_CheckBox_SetGroup(coName + "_M4B", group);
	Component_CheckBox_SetGroup(coName + "_M4C", group);

	Component_CheckBox_SetText(coName + "_M4A", "Yes");
	Component_CheckBox_SetText(coName + "_M4B", "No");
	Component_CheckBox_SetText(coName + "_M4C", "どちらでもない");

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
	Component_CheckBox_SetText(coName + "_M5C", "どちらでもない");

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

	Component_CheckBox_SetText(coName + "_M6A", "選択項目Ａ");
	Component_CheckBox_SetText(coName + "_M6B", "選択項目Ｂ");
	Component_CheckBox_SetText(coName + "_M6C", "選択項目Ｃ");
	Component_CheckBox_SetText(coName + "_M6D", "選択項目Ｄ");
	Component_CheckBox_SetText(coName + "_M6E", "選択項目Ｅ");
	Component_CheckBox_SetText(coName + "_M6F", "選択項目Ｆ");
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
