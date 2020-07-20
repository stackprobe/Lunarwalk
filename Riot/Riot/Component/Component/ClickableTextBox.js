function @@_Loaded(coName) {
	Riot_Store.set(coName, {});

//	@@_SetError(coName, ""); // ïsóvÇ»ÇÕÇ∏ÅB@ 2019.5.27
}

function @@_Shown(coName) {
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	Riot_Store.delete(coName);
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Box");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetWidth(coName, w) {
	{
		var t = Riot_Get(coName + "_Box");
		t.style.width = w + "px";
	}

	{
		var t = Riot_Get(coName + "_Input");
		t.style.width = w + "px";
	}

	@@^_Error_SetWidth(coName + "_Error", w);
}

function @@_GetText(coName) {
	return Riot_Get(coName + "_Input").value;
}

function @@_SetText(coName, text) {
	Riot_Get(coName + "_Input").value = text;
}

function @@_AddClicked(coName, routine) {
	var store = Riot_Store.get(coName);

	if(!store.ClickedEvents) {
		store.ClickedEvents = [];

		Riot_Get(coName + "_Input").onclick = function() {
			for(var i = 0; i < store.ClickedEvents.length; i++) {
				store.ClickedEvents[i]();
			}
		};
	}
	store.ClickedEvents.push(routine);
}

function @@_SetError(coName, message) {
	var f = message != "";

	{
		var t = Riot_Get(coName + "_Input");

		if(f) {
			Riot_SetClassName(t, "@@_InputError");
		}
		else {
			Riot_SetClassName(t, "@@_Input");
		}
	}

	@@^_Error_SetError(coName + "_Error", message);
}
