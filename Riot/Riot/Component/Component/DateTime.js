function @@_Loaded(coName) {
	Riot_Store.set(coName, {
		Date: 0, // YYYYMMDD, 0 == –¢“ü—Í
	});

	for(var i = 0; i < 24; i++) {
		@@^_ComboBox_AddItem(coName + "_Hour", i, @@_ValueToUIŽž•ª‚Ì”Žš(i) + "Žž");
	}
	for(var i = 0; i < 60; i++) {
		@@^_ComboBox_AddItem(coName + "_Minute", i, @@_ValueToUIŽž•ª‚Ì”Žš(i) + "•ª");
	}
}

function @@_ValueToUIŽž•ª‚Ì”Žš(value) {
	return Riot_ReplaceCharsPair(Riot_ZPad(value, 2), Riot_DECIMAL, Riot_MBC_DECIMAL);
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
	return Riot_Get(coName + "_Box");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_DateClicked(coName) {
	var store = Riot_Store.get(coName);

	@@^_Calendar_SetDate(coName + "_Calendar", store.Date);

	@@^_Balloon_Show(coName + "_DateBalloon");
}

function @@_DateSelected(coName) {
	var store = Riot_Store.get(coName);
	var date = @@^_Calendar_GetDate(coName + "_Calendar");

	store.Date = date;

	@@_DateChanged(coName);
}

function @@_DateChanged(coName) {
	var store = Riot_Store.get(coName);

	if(store.Date == 0) {
		Component_ClickableTextBox_SetText(coName + "_Date", "");
	}
	else {
		var date = store.Date;

		var y = Math.floor(date / 10000);
		var m = Math.floor(date / 100) % 100;
		var d = date % 100;

		Component_ClickableTextBox_SetText(coName + "_Date", y + "”N" + m + "ŒŽ" + d + "“ú");
	}
}

function @@_CalendarOkClicked(coName) {
	@@^_Balloon_Hide(coName + "_DateBalloon");
}

function @@_CalendarCancelClicked(coName) {
	var store = Riot_Store.get(coName);

	store.Date = 0;

	@@_DateChanged(coName);

	@@^_Balloon_Hide(coName + "_DateBalloon");
}

function @@_SetDateTime(coName, dateTime) { // dateTime: YYYYMMDDhhmm, 0 == –¢Ý’è
	var store = Riot_Store.get(coName);

	if(dateTime == 0) {
		store.Date = 0;

		Component_ComboBox_SetValue(coName + "_Hour",   "@(NONE)");
		Component_ComboBox_SetValue(coName + "_Minute", "@(NONE)");
	}
	else {
		var date = Math.floor(dateTime / 10000);
		var h = Math.floor(dateTime / 100) % 100;
		var m = dateTime % 100;

		store.Date = date;

		Component_ComboBox_SetValue(coName + "_Hour",   h);
		Component_ComboBox_SetValue(coName + "_Minute", m);
	}

	@@_DateChanged(coName);
}

function @@_GetDateTime(coName) { // ret: YYYYMMDDhhmm, 0 == –¢“ü—Í
	var store = Riot_Store.get(coName);

	var h = Component_ComboBox_GetValue(coName + "_Hour");
	var m = Component_ComboBox_GetValue(coName + "_Minute");

	var dateTime;

	if(store.Date == 0 || h == "@(NONE)" || m == "@(NONE)") {
		dateTime = 0;
	}
	else {
		dateTime = store.Date * 10000 + parseInt(h) * 100 + parseInt(m);
	}
	return dateTime;
}

function @@_SetError(coName, message) {
	var f = message != "";
	var m = f ? "@(ERROR_NO_MESSAGE)" : "";

	@@^_ClickableTextBox_SetError(coName + "_Date", m);

	@@^_ComboBox_SetError(coName + "_Hour",   m);
	@@^_ComboBox_SetError(coName + "_Minute", m);

	@@^_Error_SetError(coName + "_Error", message);
}
