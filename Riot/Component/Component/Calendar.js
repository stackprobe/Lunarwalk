var @@_DAY_ID_PREFIX = "@(_PW9)";

function @@_Loaded(coName) {
	Riot_Store.set(coName, {
		Y: -1,
		M: -1,
		Date: 0, // YYYYMMDD, 0 == 未選択
		ChangedEvents: [],
	});

	for(var i = 0; i < @(@@_COLUMN_COUNT); i++) {
		@@_AppendWeek(coName, i, "日月火水木金土".substring(i, i + 1));
	}
	for(var i = 0; i < @(@@_COLUMN_COUNT) * @(@@_ROW_COUNT); i++) {
		@@_AppendDay(coName, @@_Day_CreateElement(coName + "_Day" + i));
//		@@_AppendDay(coName, @@_Day_CreateElement(coName + "_" + Riot_Unq()));
//		@@_AppendDay(coName, @@_Day_CreateElement(coName + "_" + @@_DAY_ID_PREFIX + Riot_Unq()));
	}
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
	return Riot_Get(coName + "_Table");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

//var @@_WEEK_ID_PREFIX = "@(_PW9)";

function @@_AppendWeek(coName, i, text) {
	var cn = coName + "_Week" + i;
//	var cn = coName + "_" + Riot_Unq();
//	var cn = coName + "_" + @@_WEEK_ID_PREFIX + Riot_Unq();

	Riot_Get(coName + "_Table").insertBefore(@@_Week_CreateElement(cn), Riot_Get(coName + "_EndOfDays"));
//	Riot_Append(coName + "_Table", @@_Week_CreateElement(cn));

	@@_Week_SetText(cn, text);
}

function @@_AppendDay(coName, tag) {
	Riot_Get(coName + "_Table").insertBefore(tag, Riot_Get(coName + "_EndOfDays"));
//	Riot_Append(coName + "_Table", tag);
}

function @@_SetCurrentAuto(coName) {
	@@_SetCurrentDate(coName, Riot_DateToDay_GetTodayDate());
}

function @@_SetCurrentDate(coName, date) {
	var y = Math.floor(date / 10000);
	var m = Math.floor(date / 100) % 100;
//	var d = date % 100;

	@@_SetYearMonth(coName, y, m);
}

function @@_SetYearMonth(coName, y, m) {
	var store = Riot_Store.get(coName);

	store.Y = y;
	store.M = m;

	Riot_Get(coName + "_HeaderYM").innerText = y + "年" + m + "月";

	var weekday = Riot_DateToDay_DateToWeekday(y * 10000 + m * 100 + 1);
	var day = Riot_DateToDay_ToDay(y * 10000 + m * 100 + 1) - weekday;

	for(var i = 0; i < @(@@_COLUMN_COUNT) * @(@@_ROW_COUNT); i++) {
		var date = Riot_DateToDay_ToDate(day);
		var date_m = Math.floor(date / 100) % 100;

		@@_Day_SetDate(coName + "_Day" + i, date, date_m != m);

		day++;
	}
}

function @@_SetDate(coName, date) { // date: YYYYMMDD, 0 == 未選択
	var store = Riot_Store.get(coName);

	store.Date = date;

	/*
		画面更新
	*/
	if(date != 0) {
		@@_SetCurrentDate(coName, date);
	}
	else if(store.Y != -1) {
		@@_SetYearMonth(coName, store.Y, store.M);
	}
	else {
		@@_SetCurrentAuto(coName);
	}
}

function @@_GetDate(coName) { // ret: YYYYMMDD, 0 == 未選択
	var store = Riot_Store.get(coName);

	return store.Date;
}

function @@_AddChanged(coName, routine) {
	var store = Riot_Store.get(coName);

	store.ChangedEvents.push(routine);
}

// private -->

function @@_PrevMonth(coName) {
	var store = Riot_Store.get(coName);

	var y = store.Y;
	var m = store.M;

	m--;

	if(m < 1) {
		y--;
		m = 12;

		if(y < 1000) {
			y = 1000;
			m = 1;
		}
	}
	@@_SetYearMonth(coName, y, m);
}

function @@_NextMonth(coName) {
	var store = Riot_Store.get(coName);

	var y = store.Y;
	var m = store.M;

	m++;

	if(12 < m) {
		y++;
		m = 1;

		if(9998 < y) {
			y = 9998;
			m = 12;
		}
	}
	@@_SetYearMonth(coName, y, m);
}
