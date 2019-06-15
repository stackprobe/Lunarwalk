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
	Riot_Never();
}

function @@_SetTitle(coName, title) {
	Riot_Get(coName + "_Title").innerText = title;
}

function @@_SetDescription(coName, description) {
	Riot_Get(coName + "_Description").innerText = description;
}
