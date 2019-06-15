function @@_Loaded(coName) {
	// noop
}

function @@_Shown(coName) {
	Component_Table_AddColumn(coName + "_List", "��", 80);
	Component_Table_AddColumn(coName + "_List", "�{��", 300);
	Component_Table_AddColumn(coName + "_List", "�z�M����", 200);
	Component_Table_AddColumn(coName + "_List", "�I������", 200);
	Component_Table_AddColumn(coName + "_List", "", 80); // �ҏW

	Component_Table_SetRowHeight(coName + "_List", 40);

	// test
	var dataSource =
	[
		[ "�ҏW��", "�J�X�T���N�p�[�e�B�̂��E�E�E", "2019/10/10 (��) 10:00", "2019/10/24 (��) 10:00" ],
		[ "�ҏW��", "�V���i�̂��m�点�ł��B�E�E�E", "2019/10/07 (��) 10:00", "2019/10/21 (��) 10:00" ],
		[ "�z�M��", "�労�ӃZ�[���I���������E�E�E", "2019/10/05 (�y) 10:00", "2019/10/19 (�y) 10:00" ],
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

			Component_Button_SetText(cells[c], "�ҏW");
			Component_Button_SetAction(cells[c], function() { @@^^^_Root_SetContent(Riot_CoNameToParent(coName), @@^_�V�K�o�^_Main_CreateElement(Riot_Unq())); }); // �b��
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
