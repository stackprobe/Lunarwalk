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

//var @@_ERROR_BALLOON_PADDING = 20; // old

function @@_SetWidth(coName, w) {
	{
		var t = Riot_Get(coName + "_Box");
		t.style.width = w + "px";
	}

	{
		var t = Riot_Get(coName + "_Input");
		t.style.width = w + "px";
	}

	{
		var t = Riot_Get(coName + "_ErrorBalloon");
		t.style.width = (w - @(@@_ERROR_BALLOON_PADDING) * 2) + "px";
//		t.style.width = (w - @@_ERROR_BALLOON_PADDING * 2) + "px"; // old
	}
}

function @@_SetError(coName, message) { // message: "" == ÉGÉâÅ[âèú
	var f = message != "";

	{
		var t = Riot_Get(coName + "_Input");

		if(f) {
			Riot_SetClassName(t, "@@_InputError");
		}
		else {
			Riot_SetClassName(t, "@@_Input");
		}
	}

	{
		var t = Riot_Get(coName + "_Error");

		if(f) {
			t.style.display = "block";
		}
		else {
			t.style.display = "none";
		}
	}

	{
		var t = Riot_Get(coName + "_ErrorBalloon");
		t.innerText = message;
	}
}

function @@_GetText(coName) {
	return Riot_Get(coName + "_Input").value;
}

function @@_SetText(coName, text) {
	Riot_Get(coName + "_Input").value = text;
}

function @@_SetChanged(coName, routine) {
	Riot_Get(coName + "_Input").oninput = function() {
		Riot_Event_SetUI(function() {
			routine();
		});
	};
}
