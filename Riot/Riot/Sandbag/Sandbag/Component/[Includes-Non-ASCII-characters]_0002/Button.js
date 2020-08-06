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

function @@_SetText(coName, text) {
	Riot_Get(coName + "_A").innerText = text;
}

function @@_SetAction(coName, routine) {
//	Riot_Get(coName + "_A").onclick = routine; // old
	Riot_Get(coName + "_A").onclick = function() {
		Riot_Event_SetUI(function() {
			routine();
		});
	};
}
