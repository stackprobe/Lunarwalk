function @@_Loaded(coName) {
	Riot_Store.set(coName, {
		Y: -1,
		M: -1,
		Date: 0, // YYYYMMDD, 0 == 未選択
		ChangedEvents: [],
	});

	for(var i = 0; i < @(@@_ROWCNT); i++) {
		@@_AppendWeek(coName, @@_Week_CreateElement(coName + "_Week_" + i));
	}
	for(var i = 0; i < @(@@_COLCNT); i++) {
		@@_AppendHeaderCell(coName, @@_HeaderCell_CreateElement(coName + "_HeaderCell_" + i));

		@@_HeaderCell_SetText(coName + "_HeaderCell_" + i, "日月火水木金土".substring(i, i + 1));
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
	return Riot_Get(coName + "_MainTable");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_AppendWeek(coName, weekTag) {
	Riot_Append(coName + "_MainTable", weekTag);
}

function @@_AppendHeaderCell(coName, headerCellTag) {
	Riot_Append(coName + "_HeaderRow", headerCellTag);
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

	Riot_Get(coName + "_TitleCellYM").innerText = y + "年" + m + "月";

	var weekday = Riot_DateToDay_DateToWeekday(y * 10000 + m * 100 + 1);
	var day = Riot_DateToDay_ToDay(y * 10000 + m * 100 + 1) - weekday;

	for(var rowidx = 0; rowidx < @(@@_ROWCNT); rowidx++) {
	for(var colidx = 0; colidx < @(@@_COLCNT); colidx++) {
		var date = Riot_DateToDay_ToDate(day);
		var date_m = Math.floor(date / 100) % 100;

		@@_Week_Day_SetDate(coName + "_Week_" + rowidx + "_Day_" + colidx, date, date_m != m);

		day++;
	}}
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
