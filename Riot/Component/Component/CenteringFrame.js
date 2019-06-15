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
	return Riot_Get(coName + "_Frame");
}

function @@_Resized(coName) {
	// noop
}

function @@_Append(coName, tag) {
	Riot_Append(coName + "_Container", tag);
}

function @@_SetWidth(coName, w) {
	Riot_Get(coName + "_Frame").style.width = w + "px";
}

function @@_SetHeight(coName, h) {
	Riot_Get(coName + "_Frame").style.height = h + "px";
}

function @@_StickLeft(coName) {
	Riot_Get(coName + "_Container").style.width = "100%";
}

function @@_StickTop(coName) {
	Riot_Get(coName + "_Container").style.height = "100%";
}
