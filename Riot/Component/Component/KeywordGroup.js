function @@_Loaded(coName) {
	Riot_Store.set(coName, {
		ChangedEvents: [],
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
	return Riot_Get(coName + "_List");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

var @@_KEYWORD_ID_PREFIX = "@(_PW9)";

function @@_AddKeyword(coName, keyword) { // ret: added row's coName
	var cn = coName + "_" + @@_KEYWORD_ID_PREFIX + Riot_Unq();

	Riot_Get(coName + "_List").insertBefore(@@^_Keyword_CreateElement(cn), Riot_Get(coName + "_EndOfList"));

	Riot_Event_Add(function() {
		@@^_Keyword_SetText(cn, keyword);
		@@^_Keyword_AddChanged(cn, function() { @@_Changed(coName); });
	});

	return cn;
}

function @@_GetItems(coName) { // ret: @@^_Keyword's coNames
	var ret = Riot_Get(coName + "_List").children;

	ret = Riot_Where(ret, function(v) {
		return Riot_StartsWith(v.id, coName + "_" + @@_KEYWORD_ID_PREFIX);
	});

	ret = Riot_Select(ret, function(v) {
		return Riot_CoNameToParent(v.id); // root tag's id -> coName
	});

	return ret;
}

function @@_GetKeywords(coName) {
	var ret = @@_GetItems(coName);

	ret = Riot_Select(ret, function(v) {
		return @@^_Keyword_GetText(v);
	});

	return ret;
}

function @@_GetSelectedKeywords(coName) {
	var ret = @@_GetItems(coName);

	ret = Riot_Where(ret, function(v) {
		return @@^_Keyword_IsSelected(v);
	});

	ret = Riot_Select(ret, function(v) {
		return @@^_Keyword_GetText(v);
	});

	return ret;
}

function @@_GetNotSelectedKeywords(coName) {
	var ret = @@_GetItems(coName);

	ret = Riot_Where(ret, function(v) {
		return @@^_Keyword_IsSelected(v) == false;
	});

	ret = Riot_Select(ret, function(v) {
		return @@^_Keyword_GetText(v);
	});

	return ret;
}

function @@_SetSelectedKeywords(coName, keywords) {
	var items = @@_GetItems(coName);

	for(var i = 0; i < items.length; i++) {
		var item = items[i];

		@@^_Keyword_SetSelected(item, Riot_Array_Contains(keywords, @@^_Keyword_GetText(item)));
	}
}

function @@_Changed(coName) {
	var store = Riot_Store.get(coName);

	for(var i = 0; i < store.ChangedEvents.length; i++) {
		store.ChangedEvents[i]();
	}
}

function @@_AddChanged(coName, routine) {
	var store = Riot_Store.get(coName);

	store.ChangedEvents.push(routine);
}
