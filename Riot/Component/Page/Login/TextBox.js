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

function @@_SetTypePassword(coName) {
	Riot_Get(coName + "_Input").type = "password";
}

function @@_SetText(coName, text) {
	Riot_Get(coName + "_Input").value = text;
}

function @@_GetText(coName, text) {
	return Riot_Get(coName + "_Input").value;
}

