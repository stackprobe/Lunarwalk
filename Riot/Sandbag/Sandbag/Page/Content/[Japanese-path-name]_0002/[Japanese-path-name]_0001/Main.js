function @@_Loaded(coName) {
	var group = Component_CheckBox_Group_New();

	Component_CheckBox_Group_SetSelectedCountMax(group, 1);

	Component_CheckBox_SetGroup(coName + "_Yes", group);
	Component_CheckBox_SetGroup(coName + "_No", group);
}

function @@_Shown(coName) {
	// noop
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
