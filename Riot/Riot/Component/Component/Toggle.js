function @@_Loaded(coName) {
	Riot_Store.set(coName, {
		Value: false,
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

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Box");
}

function @@_Change(coName) {
	var store = Riot_Store.get(coName);

	store.Value = store.Value == false;

	@@_Changed(coName);
}

function @@_SetValue(coName, value) { // value: boolean
	var store = Riot_Store.get(coName);

	store.Value = value;

	@@_Changed(coName);
}

function @@_GetValue(coName) { // ret: boolean
	var store = Riot_Store.get(coName);

	return store.Value;
}

function @@_AddChanged(coName, routine) {
	var store = Riot_Store.get(coName);

	store.ChangedEvents.push(routine);
}

function @@_Changed(coName) {
	var store = Riot_Store.get(coName);

	{
		var t = Riot_Get(coName + "_Track");

		t.style.backgroundColor = store.Value ? "@(@@_TRACK_BACKGROUND_COLOR_ON)" : "@(@@_TRACK_BACKGROUND_COLOR_OFF)";
	}

	{
		var t = Riot_Get(coName + "_Circle");

		t.style.left = (store.Value ? @(@@_WIDTH) - @(@@_R) * 2 + @(@@_CIRCLE_MARGIN) : @(@@_CIRCLE_MARGIN)) + "px";
	}

	for(var i = 0; i < store.ChangedEvents.length; i++) {
		store.ChangedEvents[i]();
	}
}

function @@_ƒNƒŠƒbƒN–³Œø‰»(coName) {
	Riot_Get(coName + "_Track").onclick = function() {};
}
