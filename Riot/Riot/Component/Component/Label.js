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
	return Riot_Get(coName + "_Label");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetText(coName, text) {
	Riot_Get(coName + "_Label").innerText = text;
}

function @@_SetColor(coName, color) {
	Riot_Get(coName + "_Label").style.color = color;
}

function @@_SetBackgroundColor(coName, color) {
	Riot_Get(coName + "_Label").style.backgroundColor = color;
}

function @@_SetAlign(coName, align) { // align: "LCR" == { left, center, right }
	switch(align) {
	case "L": align = "left"; break;
	case "C": align = "center"; break;
	case "R": align = "right"; break;

	default:
		Riot_Never();
	}
	Riot_Get(coName + "_Label").style.textAlign = align;
}

function @@_SetWidth(coName, w) { // w: ÉsÉNÉZÉãêî, -1 == âèú
	if(w == -1) {
		w = "";
	}
	else {
		w = w + "px";
	}
	Riot_Get(coName + "_Label").style.width = w;
}

function @@_SetPadding(coName, l, t, r, b) {
	Riot_Get(coName + "_Label").style.padding = t + "px " + r + "px " + b + "px " + l + "px";
}
