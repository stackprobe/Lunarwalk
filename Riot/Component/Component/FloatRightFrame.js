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

function @@_Append(coName, tag) {
	Riot_SetFloatRight(tag);
	Riot_Get(coName + "_Frame").insertBefore(tag, Riot_Get(coName + "_Frame").children[0]); // ç≈èâÇÃóvëfÇÃëO
}
