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
	return Riot_Get(coName + "_Box");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetWidth(coName, w) {
	{
		var t = Riot_Get(coName + "_Combo");
		t.style.width = w;
	}

	@@^_Error_SetWidth(coName + "_Error", w);
}

function @@_SetError(coName, message) {
	var f = message != "";

	{
		var t = Riot_Get(coName + "_Combo");

		if(f) {
			Riot_SetClassName(t, "@@_ComboError");
		}
		else {
			Riot_SetClassName(t, "@@_Combo");
		}
	}

	@@^_Error_SetError(coName + "_Error", message);
}

var @@_OPTION_ID_PREFIX = "@(_PW9)";

function @@_Clear(coName, value) {
	var options = Riot_Get(coName + "_Combo").children;

	options = Riot_Where(options, function(v) {
		return Riot_StartsWith(v.id, coName + "_" + @@_OPTION_ID_PREFIX);
	});

	for(var i = 0; i < options.length; i++) {
		Riot_Remove(options[i]);
	}
}

function @@_AddItem(coName, value, text) {
	var option = document.createElement("option");

	option.id = coName + "_" + @@_OPTION_ID_PREFIX + Riot_Unq();
	option.value = value;
	option.innerText = text;

	Riot_Append(coName + "_Combo", option);
}

function @@_GetValue(coName) {
	var t = Riot_Get(coName + "_Combo");
	var v = t.options[t.selectedIndex].value;

	return v;
}

function @@_SetValue(coName, value) {
	var i = @@_IndexOfValue(coName, value);

	if(i != -1) {
		var t = Riot_Get(coName + "_Combo");

		t.selectedIndex = i;
	}
}

function @@_AddChanged(coName, routine) {
	var store = Riot_Store.get(coName);

	store.ChangedEvents.push(routine);
}

// private -->

function @@_Changed(coName) {
	var store = Riot_Store.get(coName);

	for(var i = 0; i < store.ChangedEvents.length; i++) {
		store.ChangedEvents[i]();
	}
}

function @@_IndexOfValue(coName, value) {
	var t = Riot_Get(coName + "_Combo");

	for(var i = 0; i < t.options.length; i++) {
		if(t.options[i].value == value) {
			return i;
		}
	}
	return -1;
}
