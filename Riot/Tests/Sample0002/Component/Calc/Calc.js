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
	return Riot_Get(coName + "_Root");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_DoCalc(coName) {
	var v1 = Component_TextBox_GetText(coName + "_V1");
	var operation = Component_ComboBox_GetValue(coName + "_Operation");
	var v2 = Component_TextBox_GetText(coName + "_V2");

	var prm = [
		v1,
		operation,
		v2,
	];

	Riot_Request("/calc.alt.txt", prm, function(ret) {
		if(ret == null) {
			ret = "Error";
		}
		Component_TextBox_SetText(coName + "_Answer", ret);
	});
}
