@@_CheckBoxes = []; // coNames

function @@_Loaded(coName) {
	Riot_Store.set(coName, {
		Group: @@_Group_GetDefault(),
		Value: "CheckBoxAutoValue" + Riot_Unq(),
		Selected: false,
		LastSelectedSerial: 0,
		RadioLook: false,
	});

	@@_CheckBoxes.push(coName);
}

function @@_Shown(coName) {
	// noop
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	Riot_Array_Remove(@@_CheckBoxes, coName);

	Riot_Store.delete(coName);
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Box");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetGroup(coName, group) {
	Riot_Store.get(coName).Group = group;
}

function @@_GetGroup(coName) {
	return Riot_Store.get(coName).Group;
}

function @@_SetValue(coName, value) {
	Riot_Store.get(coName).Value = value;
}

function @@_GetValue(coName) {
	return Riot_Store.get(coName).Value;
}

function @@_SetText(coName, text) {
	Riot_Get(coName + "_Label").innerText = text
}

function @@_Changed(coName) {
	var store = Riot_Store.get(coName);
	var f = store.Selected;
	var color = f ? "@(@@_COLOR_ON)" : "@(@@_COLOR_OFF)";

	Riot_Get(coName + "_Box").style.border = "1px solid " + color;
	Riot_Get(coName + "_CheckBox").style.backgroundColor = color;
	Riot_Get(coName + "_CheckBoxImage").src = f ? (store.RadioLook ? "@(GLOBAL)_@@_RadioOn.png" : "@(GLOBAL)_@@_On.png") : "@(GLOBAL)_@@_Off.png";
	Riot_Get(coName + "_Label").style.color = color;

	// •â³ -->

	{
		var checkBoxes = @@_CheckBoxes;

		checkBoxes = Riot_Where(checkBoxes, function(v) {
			return @@_Group_Match(Riot_Store.get(v).Group, store.Group) && @@_IsSelected(v);
		});

		Riot_SortComp(checkBoxes, function(a, b) {
			return Riot_Store.get(a).LastSelectedSerial - Riot_Store.get(b).LastSelectedSerial;
		});

		var n = checkBoxes.length - @@_Group_GetSelectedCountMax(store.Group);

		for(var i = 0; i < n; i++) {
			@@_SetSelected(checkBoxes[i], false);
		}
	}
}

var @@_SelectedSerial = 0;

function @@_SetSelected(coName, selected) {
	var store = Riot_Store.get(coName);

	store.Selected = selected;
	store.LastSelectedSerial = ++@@_SelectedSerial;

	@@_Changed(coName);
}

function @@_Select(coName) {
	var store = Riot_Store.get(coName);

	@@_SetSelected(coName, store.Selected == false);
}

function @@_IsSelected(coName) {
	var store = Riot_Store.get(coName);

	return store.Selected;
}

function @@_SetRadioLook(coName) {
	Riot_Store.get(coName).RadioLook = true;

	@@_Changed(coName);
}
