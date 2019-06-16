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
	return Riot_Get(coName + "_Box");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetWidth(coName, w) {
	var t = Riot_Get(coName + "_Box");

	t.style.width = w;
	t.style.minWidth = w;
	t.style.maxWidth = w;
}

function @@_SetHeight(coName, h) {
	var t = Riot_Get(coName + "_Box");

	t.style.height = h;
	t.style.minHeight = h;
	t.style.maxHeight = h;
}
