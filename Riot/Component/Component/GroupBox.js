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
	Riot_Append(coName + "_Body", tag);
}

function @@_SetWidth(coName, w) {
	Riot_Get(coName + "_Box").style.width = w;
}

function @@_SetTitle(coName, title) {
	Riot_Get(coName + "_Header").innerText = title;
}

function @@_SetColor(coName, borderColor, headerColor) {
	Riot_Get(coName + "_Box")   .style.border       = "1px solid " + borderColor;
	Riot_Get(coName + "_Header").style.borderBottom = "1px solid " + borderColor;

	Riot_Get(coName + "_Header").style.backgroundColor = headerColor;
}

function @@_SetPaddingRightPx(coName, w) { // w: -1 == âèú
	if(w == -1) {
		w = "";
	}
	else {
		w += "px";
	}
	Riot_Get(coName + "_Body").style.paddingRight = w;
}

function @@_SetPaddingRight(coName) {
	Riot_Get(coName + "_Body").style.paddingRight = "20px";
}
