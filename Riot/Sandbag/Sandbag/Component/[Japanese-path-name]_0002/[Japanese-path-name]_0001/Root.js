function @@_Loaded(coName) {
	// old -- .component.txt �ֈړ������B
	/*
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_DashboardMenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_�L���Ǘ�MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_�₢���킹�Ǘ�MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_�I�����C���T����MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_��A�C�e���Ǘ�MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_Room�A�C�e���Ǘ�MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_���p�ҊǗ�MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_�X�܏��MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_�^�c�ւ̖₢���킹MenuItem"));
	*/
}

function @@_Shown(coName) {
	@@_WestItem_SetText(coName + "_DashboardMenuItem",				"Dashboard");
	@@_WestItem_SetText(coName + "_�L���Ǘ�MenuItem",				"�L���Ǘ�");
	@@_WestItem_SetText(coName + "_�₢���킹�Ǘ�MenuItem",			"�₢���킹�Ǘ�");
	@@_WestItem_SetText(coName + "_�I�����C���T����MenuItem",		"�I�����C���T����");
	@@_WestItem_SetText(coName + "_��A�C�e���Ǘ�MenuItem",		"��A�C�e���Ǘ�");
	@@_WestItem_SetText(coName + "_Room�A�C�e���Ǘ�MenuItem",		"Room�A�C�e���Ǘ�");
	@@_WestItem_SetText(coName + "_���p�ҊǗ�MenuItem",				"���p�ҊǗ�(�Ǘ��җp)");
	@@_WestItem_SetText(coName + "_�X�܏��MenuItem",				"�X�܏��(�Ǘ��җp)");
	@@_WestItem_SetText(coName + "_�^�c�ւ̖₢���킹MenuItem",		"�^�c�ւ̖₢���킹(�Ǘ��җp)");

	@@_WestItem_SetAction(coName + "_DashboardMenuItem",
		function() {
			@@_SetContent(coName, @@^_Content_Dashboard_Main_CreateElement(coName + "_Content"));
		});
	@@_WestItem_SetAction(coName + "_�L���Ǘ�MenuItem",
		function() {
			@@_SetContent(coName, @@^_Content_�L���Ǘ�_Main_CreateElement(coName + "_Content"));
		});
	@@_WestItem_SetAction(coName + "_�₢���킹�Ǘ�MenuItem",
		function() {
			@@_SetContent(coName, @@^_Content_�₢���킹�Ǘ�_Main_CreateElement(coName + "_Content"));
		});
	@@_WestItem_SetAction(coName + "_�I�����C���T����MenuItem",
		function() {
			@@_SetContent(coName, @@^_Content_�I�����C���T����_Main_CreateElement(coName + "_Content"));
		});
	@@_WestItem_SetAction(coName + "_��A�C�e���Ǘ�MenuItem",		function() { Riot_Get(coName + "_EastContent").innerText = "4"; });
	@@_WestItem_SetAction(coName + "_Room�A�C�e���Ǘ�MenuItem",		function() { Riot_Get(coName + "_EastContent").innerText = "5"; });
	@@_WestItem_SetAction(coName + "_���p�ҊǗ�MenuItem",			function() { Riot_Get(coName + "_EastContent").innerText = "6"; });
	@@_WestItem_SetAction(coName + "_�X�܏��MenuItem",				function() { Riot_Get(coName + "_EastContent").innerText = "7"; });
	@@_WestItem_SetAction(coName + "_�^�c�ւ̖₢���킹MenuItem",	function() { Riot_Get(coName + "_EastContent").innerText = "8"; });
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	// noop
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_MainTable");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_AppendWestItem(coName, tag) {
	Riot_Append(coName + "_WestTd", tag);
}

function @@_SetContent(coName, tag) {
	Riot_Set(coName + "_EastContent", tag);
}
