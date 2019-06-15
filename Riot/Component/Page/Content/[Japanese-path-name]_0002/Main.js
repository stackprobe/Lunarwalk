function @@_Loaded(coName) {
	// noop
}

function @@_Shown(coName) {
	Component_Table_AddColumn(coName + "_List", "状況", 80);
	Component_Table_AddColumn(coName + "_List", "本文", 300);
	Component_Table_AddColumn(coName + "_List", "配信日時", 200);
	Component_Table_AddColumn(coName + "_List", "終了日時", 200);
	Component_Table_AddColumn(coName + "_List", "", 80); // 編集

	Component_Table_SetRowHeight(coName + "_List", 40);

	// test
	var dataSource =
	[
		[ "編集可", "開店５周年パーティのお・・・", "2019/10/10 (木) 10:00", "2019/10/24 (木) 10:00" ],
		[ "編集可", "新商品のお知らせです。・・・", "2019/10/07 (月) 10:00", "2019/10/21 (月) 10:00" ],
		[ "配信中", "大感謝セール！○月○日・・・", "2019/10/05 (土) 10:00", "2019/10/19 (土) 10:00" ],
	];

	Riot_Event_Later(function() {
		for(var i = 0; i < dataSource.length; i++) {
			Component_Table_AddRow(coName + "_List");
		}
	});

	Riot_Event_Later(function() {
		var rows = Component_Table_GetRows(coName + "_List");

		for(var i = 0; i < dataSource.length; i++) {
			var row = rows[i];

			Component_Table_Row_AddCell(row, Component_Label_CreateElement(coName + "_" + Riot_Unq()));
			Component_Table_Row_AddCell(row, Component_Label_CreateElement(coName + "_" + Riot_Unq()));
			Component_Table_Row_AddCell(row, Component_Label_CreateElement(coName + "_" + Riot_Unq()));
			Component_Table_Row_AddCell(row, Component_Label_CreateElement(coName + "_" + Riot_Unq()));
			Component_Table_Row_AddCell(row, Component_Button_CreateElement(coName + "_" + Riot_Unq()));
		}
	});

	Riot_Event_Later(function() {
		var rows = Component_Table_GetRows(coName + "_List");

		for(var i = 0; i < dataSource.length; i++) {
			var row = rows[i];
			var cells = Component_Table_Row_GetCellTags(row);

			cells = Riot_Select(cells, function(v) {
				return Riot_CoNameToParent(v.id); // root tag's id -> coName
			});

			var c = 0;

			Component_Label_SetText(cells[c], dataSource[i][c]); c++;
			Component_Label_SetText(cells[c], dataSource[i][c]); c++;
			Component_Label_SetText(cells[c], dataSource[i][c]); c++;
			Component_Label_SetText(cells[c], dataSource[i][c]); c++;

			Component_Button_SetText(cells[c], "編集");
			Component_Button_SetAction(cells[c], function() { @@^^^_Root_SetContent(Riot_CoNameToParent(coName), @@^_新規登録_Main_CreateElement(Riot_Unq())); }); // 暫定
			Component_Button_SetHeight(cells[c], 40);
			c++;
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
