function @@_Loaded(coName) {
	for(var i = 0; i < @(@@^_COLCNT); i++) {
		@@_AppendDay(coName, @@_Day_CreateElement(coName + "_Day_" + i));
	}
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
	return Riot_Get(coName + "_Row");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_AppendDay(coName, dayTag) {
	Riot_Append(coName + "_Row", dayTag);
}
