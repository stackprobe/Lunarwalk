function @@_Loaded(coName) {
	Riot_Store.set(coName, {});
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
	return Riot_Get(coName + "_List");
}

function @@_GetEndOfList(coName) {
	return Riot_Get(coName + "_EndOfList");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

var @@_ROW_ID_PREFIX = "@(_PW9)";

function @@_AddRow(coName) { // ret: added row's coName
	var cn = coName + "_" + @@_ROW_ID_PREFIX + Riot_Unq();

	Riot_Get(coName + "_List").insertBefore(@@_Row_CreateElement(cn), Riot_Get(coName + "_EndOfList"));

	return cn;
}

function @@_GetRows(coName) { // ret: coNames
	var ret = Riot_Get(coName + "_List").children;

	ret = Riot_Where(ret, function(v) {
		return Riot_StartsWith(v.id, coName + "_" + @@_ROW_ID_PREFIX);
	});

	ret = Riot_Select(ret, function(v) {
		return Riot_CoNameToParent(v.id); // root tag's id -> coName
	});

	return ret;
}
