function @@_Loaded(coName) {
	Riot_Store.set(coName, {
		Text: "",
		Selected: false,
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
	return Riot_Get(coName + "_Keyword");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_AddChanged(coName, routine) {
	var store = Riot_Store.get(coName);

	store.ChangedEvents.push(routine);
}

function @@_Changed(coName) {
	var store = Riot_Store.get(coName);

	var t = Riot_Get(coName + "_Keyword");

	if(store.Selected) {
		Riot_SetClassName(t, "@@_KeywordSelected");
	}
	else {
		Riot_SetClassName(t, "@@_Keyword");
	}

	for(var i = 0; i < store.ChangedEvents.length; i++) {
		store.ChangedEvents[i]();
	}
}

function @@_Select(coName) {
	var store = Riot_Store.get(coName);

	store.Selected = store.Selected == false;

	@@_Changed(coName);
}

function @@_SetSelected(coName, selected) {
	var store = Riot_Store.get(coName);

	store.Selected = selected;

	@@_Changed(coName);
}

function @@_IsSelected(coName) {
	var store = Riot_Store.get(coName);

	return store.Selected;
}

function @@_SetText(coName, text) {
	var store = Riot_Store.get(coName);

	store.Text = text;

	Riot_Get(coName + "_Keyword").innerText = text;
}

function @@_GetText(coName) {
	var store = Riot_Store.get(coName);

	return store.Text;
}
