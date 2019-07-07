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

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			var ans;

			if(xhr.status == 200) {
				ans = JSON.parse(xhr.responseText);
			}
			else {
				ans = "Error: " + xhr.status;
			}
			Component_TextBox_SetText(coName + "_Answer", ans);
		}
	};

	xhr.open("POST", "/calc.alt.txt");
	xhr.send(JSON.stringify([
		v1,
		operation,
		v2,
	]));
}
