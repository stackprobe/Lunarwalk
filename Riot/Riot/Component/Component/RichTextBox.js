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
	{
		var t = Riot_Get(coName + "_Frame");

		t.style.width = w + "px";
	}

	@@^_Error_SetWidth(coName + "_Error", w);
}

function @@_SetHeight(coName, h) {
	{
		var t = Riot_Get(coName + "_EditArea");

		t.style.height    = h + "px";
		t.style.minHeight = h + "px";
		t.style.maxHeight = h + "px";
	}
}

function @@_GetText(coName) {
	return Riot_Get(coName + "_EditArea").innerHTML;
}

function @@_SetText(coName, text) {
	Riot_Get(coName + "_EditArea").innerHTML = text;
}

function @@_SetError(coName, message) {
	var f = message != "";

	{
		var t = Riot_Get(coName + "_EditArea");

		if(f) {
			Riot_SetClassName(t, "@@_EditAreaError");
		}
		else {
			Riot_SetClassName(t, "@@_EditArea");
		}
	}

	@@^_Error_SetError(coName + "_Error", message);
}

// private -->

function @@_ComboChanged(coName, selectTagId, command, valueFilter) {
	var t = Riot_Get(selectTagId);
	var v = t.options[t.selectedIndex].value;

	if(v != "@(NONE)") {
		document.execCommand(command, false, valueFilter(v));
		t.selectedIndex = 0;
	}
}

function @@_FontSizeChanged(coName) {
	@@_ComboChanged(coName, coName + "_FontSize", "fontSize", function(v) { return parseInt(v); });
}

function @@_FontNameChanged(coName) {
	@@_ComboChanged(coName, coName + "_FontName", "fontName", function(v) { return v; });
}

function @@_ForeColorChanged(coName) {
	@@_ComboChanged(coName, coName + "_ForeColor", "foreColor", function(v) { return v; });
}

function @@_BackColorChanged(coName) {
	@@_ComboChanged(coName, coName + "_BackColor", "backColor", function(v) { return v; });
}

function @@_BoldPressed(coName) {
	document.execCommand("bold", false);
}

function @@_UnderPressed(coName) {
	document.execCommand("underline", false);
}

function @@_ItaricPressed(coName) {
	document.execCommand("italic", false);
}
