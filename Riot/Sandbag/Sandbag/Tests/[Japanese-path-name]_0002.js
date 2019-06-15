function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	{ // _Loaded

	Component_WhiteFrame_Append(coName + "_Main", Component_DraggableList_CreateElement(coName + "_Main2"));

	var ROWCNT = 12;
	var rows = []; // coNames

	for(var i = 0; i < ROWCNT; i++) {
		rows.push(Component_DraggableList_AddRow(coName + "_Main2"));
	}

	for(var i = 0; i < ROWCNT; i++) {
		Component_DraggableList_Row_Append(rows[i], Component_GroupBox_CreateElement(coName + "_Group_" + i));
	}

	var f = function(cn) {
		Component_GroupBox_Append(cn, Component_Label_CreateElement(cn + "_AL"));
		Component_GroupBox_Append(cn, Component_TextBox_CreateElement(cn + "_A"));
		Component_GroupBox_Append(cn, Riot_WB());
		Component_GroupBox_Append(cn, Component_Label_CreateElement(cn + "_BL"));
		Component_GroupBox_Append(cn, Component_TextBox_CreateElement(cn + "_B"));
		Component_GroupBox_Append(cn, Riot_WB());
		Component_GroupBox_Append(cn, Component_Label_CreateElement(cn + "_CL"));
		Component_GroupBox_Append(cn, Component_TextBox_CreateElement(cn + "_C"));
		Component_GroupBox_Append(cn, Riot_WB());
	};

	for(var i = 0; i < ROWCNT; i++) {
		f(coName + "_Group_" + i);
	}

	} // _Loaded

	// _Shown
	Riot_Event_Later(function() {

	// 自力で Float 設定 (廃止予定)
	{
		var rows = Component_DraggableList_GetRows(coName + "_Main2"); // coNames

		for(var i = 0; i < rows.length; i++) {
			Riot_SetFloat(Component_DraggableList_Row_GetRoot(rows[i]));
		}
		Riot_SetFloatEnd(Component_DraggableList_GetEndOfList(coName + "_Main2"));
	}

	var f = function(row, cn, w, title, c, cb) {
		Component_Label_SetText(cn + "_AL", "ラベルＡ：");
		Component_Label_SetText(cn + "_BL", "ラベルＢ：");
		Component_Label_SetText(cn + "_CL", "ラベルＣ：");

		Component_TextBox_SetWidth(cn + "_A", w - 40);
		Component_TextBox_SetWidth(cn + "_B", w - 40);
		Component_TextBox_SetWidth(cn + "_C", w - 40);

		Component_GroupBox_SetWidth(cn, w);
		Component_GroupBox_SetTitle(cn, title);
		Component_GroupBox_SetColor(cn, c, cb);

		Component_DraggableList_Row_SetWidth(row, w + 20);

		if(Math.random() < 0.5) { Component_TextBox_SetText(cn + "_A", "" + Math.random()); }
		if(Math.random() < 0.5) { Component_TextBox_SetText(cn + "_B", "" + Math.random()); }
		if(Math.random() < 0.5) { Component_TextBox_SetText(cn + "_C", "" + Math.random()); }

		Component_DraggableList_Row_TellTextBox(row, cn + "_A");
		Component_DraggableList_Row_TellTextBox(row, cn + "_B");
		Component_DraggableList_Row_TellTextBox(row, cn + "_C");
	};

	{
		var i = 0;

		f(rows[i], coName + "_Group_" + i, 200, "グループＡ", "#def", "#cde"); i++;
		f(rows[i], coName + "_Group_" + i, 200, "グループＢ", "#edf", "#dce"); i++;
		f(rows[i], coName + "_Group_" + i, 200, "グループＣ", "#fde", "#ecd"); i++;
		f(rows[i], coName + "_Group_" + i, 600, "グループＤ", "#fed", "#edc"); i++;
		f(rows[i], coName + "_Group_" + i, 400, "グループＥ", "#dfe", "#ced"); i++;
		f(rows[i], coName + "_Group_" + i, 400, "グループＦ", "#efd", "#dec"); i++;
		f(rows[i], coName + "_Group_" + i, 200, "グループＧ", "#def", "#cde"); i++;
		f(rows[i], coName + "_Group_" + i, 200, "グループＨ", "#edf", "#dce"); i++;
		f(rows[i], coName + "_Group_" + i, 200, "グループＩ", "#fde", "#ecd"); i++;
		f(rows[i], coName + "_Group_" + i, 600, "グループＪ", "#fed", "#edc"); i++;
		f(rows[i], coName + "_Group_" + i, 400, "グループＫ", "#dfe", "#ced"); i++;
		f(rows[i], coName + "_Group_" + i, 400, "グループＬ", "#efd", "#dec"); i++;
	}

	}); // _Shown
}

riot_main = riot_testmain;
