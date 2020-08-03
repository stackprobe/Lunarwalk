function @@_Loaded(coName) {
	Riot_Store.set(coName, {
		CellWidths: [],
		RowHeight: 50,
	});
}

function @@_Shown(coName) {
	// noop
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	Riot_Store.delete(coName);
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Table");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetRowHeight(coName, h) {
	Riot_Store.get(coName).RowHeight = h;
}

//var @@_HEADER_CELL_ID_PREFIX = "@(_PW9)";

function @@_AddColumn(coName, title, w) {
	var store = Riot_Store.get(coName);

	if(1 <= store.CellWidths.length) {
		@@^_FloatFrame_Append(coName + "_Head", Riot_WBW(@(@@_COLUMN_MARGIN)));
	}
	var cn = coName + "_" + Riot_Unq();
//	var cn = coName + "_" + @@_HEADER_CELL_ID_PREFIX + Riot_Unq(); // 検索しないので、

	@@^_FloatFrame_Append(coName + "_Head", @@^_Label_CreateElement(cn));

	@@^_Label_SetText(cn, title);
	@@^_Label_SetWidth(cn, w);

	store.CellWidths.push(w);

//	return cn; // 不要
}

function @@_AddRow(coName) { // ret: added @@_Row's coName
	var pcn = @@^_DraggableList_AddRow(coName + "_Rows");
	var cn = pcn + "Row";
//	var cn = pcn + "_Row"; // 階層化すると pcn の名前空間に入ってしまうのでマズい。

	@@^_DraggableList_Row_Append(pcn, @@_Row_CreateElement(cn));

	@@^_DraggableList_Row_SetWidth(pcn, @@_GetRowWidth(coName) + 20); // HACK パディング分足している。

	return cn;
}

function @@_GetRows(coName) { // ret: @@_Row's coNames
	var ret = @@^_DraggableList_GetRows(coName + "_Rows");

	ret = Riot_Select(ret, function(v) {
		return v + "Row";
	});

	return ret;
}

function @@_GetRowWidth(coName) {
	var store = Riot_Store.get(coName);
	var w = 0;

	for(var i = 0; i < store.CellWidths.length; i++) {
		if(1 <= i) {
			w += @(@@_COLUMN_MARGIN);
		}
		w += store.CellWidths[i];
	}
	return w;
}
