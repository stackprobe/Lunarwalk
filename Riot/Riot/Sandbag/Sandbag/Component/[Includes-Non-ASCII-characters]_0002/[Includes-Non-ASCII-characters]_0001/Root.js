function @@_Loaded(coName) {
	// old -- .component.txt へ移動した。
	/*
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_DashboardMenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_記事管理MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_問い合わせ管理MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_オンラインサロンMenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_陳列アイテム管理MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_Roomアイテム管理MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_利用者管理MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_店舗情報MenuItem"));
	@@_AppendWestItem(coName, @@_WestItem_CreateElement(coName + "_運営への問い合わせMenuItem"));
	*/
}

function @@_Shown(coName) {
	@@_WestItem_SetText(coName + "_DashboardMenuItem",				"Dashboard");
	@@_WestItem_SetText(coName + "_記事管理MenuItem",				"記事管理");
	@@_WestItem_SetText(coName + "_問い合わせ管理MenuItem",			"問い合わせ管理");
	@@_WestItem_SetText(coName + "_オンラインサロンMenuItem",		"オンラインサロン");
	@@_WestItem_SetText(coName + "_陳列アイテム管理MenuItem",		"陳列アイテム管理");
	@@_WestItem_SetText(coName + "_Roomアイテム管理MenuItem",		"Roomアイテム管理");
	@@_WestItem_SetText(coName + "_利用者管理MenuItem",				"利用者管理(管理者用)");
	@@_WestItem_SetText(coName + "_店舗情報MenuItem",				"店舗情報(管理者用)");
	@@_WestItem_SetText(coName + "_運営への問い合わせMenuItem",		"運営への問い合わせ(管理者用)");

	@@_WestItem_SetAction(coName + "_DashboardMenuItem",
		function() {
			@@_SetContent(coName, @@^_Content_Dashboard_Main_CreateElement(coName + "_Content"));
		});
	@@_WestItem_SetAction(coName + "_記事管理MenuItem",
		function() {
			@@_SetContent(coName, @@^_Content_記事管理_Main_CreateElement(coName + "_Content"));
		});
	@@_WestItem_SetAction(coName + "_問い合わせ管理MenuItem",
		function() {
			@@_SetContent(coName, @@^_Content_問い合わせ管理_Main_CreateElement(coName + "_Content"));
		});
	@@_WestItem_SetAction(coName + "_オンラインサロンMenuItem",
		function() {
			@@_SetContent(coName, @@^_Content_オンラインサロン_Main_CreateElement(coName + "_Content"));
		});
	@@_WestItem_SetAction(coName + "_陳列アイテム管理MenuItem",		function() { Riot_Get(coName + "_EastContent").innerText = "4"; });
	@@_WestItem_SetAction(coName + "_Roomアイテム管理MenuItem",		function() { Riot_Get(coName + "_EastContent").innerText = "5"; });
	@@_WestItem_SetAction(coName + "_利用者管理MenuItem",			function() { Riot_Get(coName + "_EastContent").innerText = "6"; });
	@@_WestItem_SetAction(coName + "_店舗情報MenuItem",				function() { Riot_Get(coName + "_EastContent").innerText = "7"; });
	@@_WestItem_SetAction(coName + "_運営への問い合わせMenuItem",	function() { Riot_Get(coName + "_EastContent").innerText = "8"; });
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
