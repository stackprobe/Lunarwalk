var @@_Items = [];

function @@_Loaded(coName) {
	@@_Items.push(Riot_Get(coName + "_Item"));

	@@_SetAction(coName, function() { });
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
	return Riot_Get(coName + "_Item");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetText(coName, text) {
	var t = Riot_Get(coName + "_Item");
	t.innerText = "\u3000\u3000" + text;
}

function @@_ClearSelection() {
	for(var i = 0; i < @@_Items.length; i++) {
		var t = @@_Items[i];
		Riot_SetClassName(t, "@@_Item");
	}
}

function @@_SetAction(coName, routine) {
	var t = Riot_Get(coName + "_Item");
	t.onclick = function() {
		Riot_Event_SetUI(function() {
			@@_ClearSelection();
			Riot_SetClassName(t, "@@_ItemSelected");
			routine();
		});
	};
}
