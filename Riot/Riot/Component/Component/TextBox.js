function @@_Loaded(coName) {
	Riot_Store.set(coName, {});

//	@@_SetError(coName, ""); // ïsóvÇ»ÇÕÇ∏ÅB@ 2019.5.27
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

function @@_AddChanged(coName, routine) {
	var store = Riot_Store.get(coName);

	if(!store.ChangedEvents) {
		store.ChangedEvents = [];

		Riot_Get(coName + "_Input").oninput = function() {
			for(var i = 0; i < store.ChangedEvents.length; i++) {
				store.ChangedEvents[i]();
			}
		};
	}
	store.ChangedEvents.push(routine);
}

function @@_AddFocusGot(coName, routine) {
	var store = Riot_Store.get(coName);

	if(!store.FocusGotEvents) {
		store.FocusGotEvents = [];

		Riot_Get(coName + "_Input").onfocus = function() {
			for(var i = 0; i < store.FocusGotEvents.length; i++) {
				store.FocusGotEvents[i]();
			}
		};
	}
	store.FocusGotEvents.push(routine);
}

function @@_AddFocusLost(coName, routine) {
	var store = Riot_Store.get(coName);

	if(!store.FocusLostEvents) {
		store.FocusLostEvents = [];

		Riot_Get(coName + "_Input").onblur = function() {
			for(var i = 0; i < store.FocusLostEvents.length; i++) {
				store.FocusLostEvents[i]();
			}
		};
	}
	store.FocusLostEvents.push(routine);
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
