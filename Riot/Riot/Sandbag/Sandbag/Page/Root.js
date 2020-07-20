function @@_Loaded(coName) {
	// noop
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
	return Riot_Get(coName + "_Root");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetContent(coName, tag) {
	Riot_Set(coName + "_EastContent", tag);
}
