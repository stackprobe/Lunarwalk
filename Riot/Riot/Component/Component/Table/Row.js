function @@_Loaded(coName) {
	Riot_Store.set(coName, {
		Tags: [],
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
	return Riot_Get(coName + "_Row");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

var @@_CELL_ID_PREFIX = "@(_PW9)";

function @@_AddCell(coName, tag) { // ret: added @^^_CenteringFrame's coName
	var store = Riot_Store.get(coName);

	if(1 <= store.Tags.length) {
		Component_FloatFrame_Append(coName + "_Cells", Riot_WBW(@(@@^_COLUMN_MARGIN)));
	}
	var cn = coName + "_" + @@_CELL_ID_PREFIX + Riot_Unq();
	var cell = Component_CenteringFrame_CreateElement(cn);

	Component_FloatFrame_Append(coName + "_Cells", cell);

	Component_CenteringFrame_Append(cn, tag);

	Component_CenteringFrame_SetWidth(cn, @@_GetCellWidth(coName, store.Tags.length));
	Component_CenteringFrame_SetHeight(cn, @@_GetCellHeight(coName));
	Component_CenteringFrame_StickLeft(cn);

	store.Tags.push(tag);

	return cn;
}

function @@_GetCells(coName) { // ret: added @^^_CenteringFrame's coNames
	var ret = Riot_GetAll(Riot_Get(coName + "_Cells"));

	ret = Riot_Where(ret, function(v) {
		return Riot_StartsWith(v.id, coName + "_" + @@_CELL_ID_PREFIX);
	});

	ret = Riot_Select(ret, function(v) {
		return Riot_CoNameToParent(v.id); // root tag's id -> coName
	});

	return ret;
}

function @@_GetCellTags(coName) { // ret: added tags
	var store = Riot_Store.get(coName);

	return store.Tags;
}

function @@_GetCellWidth(coName, index) {
	var store = Riot_Store.get(Riot_CoNameToParentLoop(coName, 2));

	if(store.CellWidths.length <= index) {
		return 100; // デフォルト適当
	}
	return store.CellWidths[index];
}

function @@_GetCellHeight(coName) {
	var store = Riot_Store.get(Riot_CoNameToParentLoop(coName, 2));

	return store.RowHeight;
}
