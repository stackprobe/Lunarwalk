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
	return Riot_Get(coName + "_Button");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetText(coName, text) {
	Riot_Get(coName + "_Button").innerText = text;
}

function @@_SetAction(coName, routine) {
	Riot_Get(coName + "_Button").onclick = function() {
		Riot_Event_SetUI(function() {
			routine();
		});
	};
}

function @@_SetHeight(coName, h) {
	Riot_Get(coName + "_Button").style.height = h + "px";
}
