function @@_Loaded(coName) {
	// noop
}

function @@_Shown(coName) {
	@@_SetError(coName, "");
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
	var t = Riot_Get(coName + "_Balloon");
	t.style.width = (w - @(@@_BALLOON_PADDING) * 2) + "px";
}

function @@_SetError(coName, message) { // message: ("" | "@(ERROR_NO_MESSAGE)") == ÉGÉâÅ[âèú
	if(message == "@(ERROR_NO_MESSAGE)") {
		message = "";
	}
	var f = message != "";

	{
		var t = Riot_Get(coName + "_Box");

		if(f) {
			t.style.display = "block";
		}
		else {
			t.style.display = "none";
		}
	}

	{
		var t = Riot_Get(coName + "_Balloon");
		t.innerText = message;
	}
}
