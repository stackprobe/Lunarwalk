function @@_Loaded(coName) {
	// noop
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

function @@_AddRow(coName) {
	var cn = Component_DraggableList_AddRow(coName + "_List");

	Component_DraggableList_Row_Append(cn, @@_Row_CreateElement(cn + "Row"));
//	Component_DraggableList_Row_Append(cn, @@_Row_CreateElement(cn + "_Row")); // cn の名前空間を侵食する。

	Component_DraggableList_Row_SetWidth(cn, Riot_Get(coName + "_ListHeader").clientWidth - 20); // todo パディング分引いてる。

	return cn;
}

function @@_GetRows(coName) {
	var ret = Component_DraggableList_GetRows(coName + "_List");

	ret = Riot_Select(ret, function(v) {
		return v + "Row";
	});

	return ret;
}
