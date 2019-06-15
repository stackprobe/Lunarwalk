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
	return Riot_Get(coName + "_Cell");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetText(coName, text) {
	Riot_Get(coName + "_Cell").innerText = text;
}
