function @@_Loaded(coName) {
	Riot_Store.set(coName, {});
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
	Riot_Append(coName + "_Balloon", tag);
}

function @@_Show(coName) {
	Riot_Get(coName + "_Box").style.display = "block";

	Riot_Refresh_Fire();
}

function @@_Hide(coName) {
	Riot_Get(coName + "_Box").style.display = "none";

	Riot_Refresh_Fire();
}

function @@_SetWidth(coName, w) {
	var t = Riot_Get(coName + "_Balloon");
	t.style.width = (w - @(@@_BALLOON_PADDING) * 2) + "px";
}

function @@_SetHeight(coName, h) {
	var t = Riot_Get(coName + "_Balloon");
	t.style.height = (h - @(@@_BALLOON_PADDING) * 2) + "px";
}
