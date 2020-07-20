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
	return Riot_Get(coName + "_Cell");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_SetDate(coName, date, outOfCurrentMonth) { // date: YYYYMMDD
	var store = Riot_Store.get(coName);

	store.Date = date;

	var tag = Riot_Get(coName + "_Cell");

	var y = Math.floor(date / 10000);
	var m = Math.floor(date / 100) % 100;
	var d = date % 100;

	tag.innerText = "" + d;

	var w = Riot_DateToDay_DateToWeekday(date);
	var ph = Riot_èjì˙_Isèjì˙(date);

	if(w == 0 || ph) {
		Riot_SetClassName(tag, "@@_Cellì˙");
	}
	else if(w == 6) {
		Riot_SetClassName(tag, "@@_Cellìy");
	}
	else {
		Riot_SetClassName(tag, "@@_Cell");
	}

	if(date == Riot_DateToDay_GetTodayDate()) {
		Riot_AddClassName(tag, "@@_CellToday");
	}

	var selected = Riot_Store.get(Riot_CoNameToParent(coName)).Date == date;

	if(selected) {
		Riot_AddClassName(tag, "@@_CellSelected");
	}
	else if(outOfCurrentMonth) {
		Riot_AddClassName(tag, "@@_Cellï ÇÃåé");
	}

	{
		var routines = Riot_Store.get(Riot_CoNameToParent(coName)).ChangedEvents;

		for(var i = 0; i < routines.length; i++) {
			routines[i]();
		}
	}
}

function @@_Select(coName) {
	var store = Riot_Store.get(coName);

	@@^_SetDate(Riot_CoNameToParent(coName), store.Date);
}
