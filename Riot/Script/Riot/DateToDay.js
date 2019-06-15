function @@_ToDay(date) { // YYYYMMDD -> Day of A.C.
	var y = Math.floor(date / 10000);
	var m = Math.floor(date / 100) % 100;
	var d = date % 100;

	if(
		y < 1 || 9999 < y ||
		m < 1 || 12 < m ||
		d < 1 || 31 < d
		) {
		return 0;
	}

	if(m <= 2) {
		y--;
	}

	var day = Math.floor(y / 400);
	day *= 365 * 400 + 97;

	y %= 400;

	day += y * 365;
	day += Math.floor(y / 4);
	day -= Math.floor(y / 100);

	if(2 < m) {
		day -= 31 * 10 - 4;
		m -= 3;
		day += Math.floor(m / 5) * (31 * 5 - 2);
		m %= 5;
		day += Math.floor(m / 2) * (31 * 2 - 1);
		m %= 2;
		day += m * 31;
	}
	else {
		day += (m - 1) * 31;
	}

	day += d - 1;
	return day;
}

function @@_ToDate(day) { // Day of A.C. -> YYYYMMDD
	if(day < 0) {
		return 10101;
	}

	var y = Math.floor(day / 146097) * 400 + 1;
	var m = 1;
	var d;
	day %= 146097;

	day += Math.min(Math.floor((day + 306) / 36524), 3);
	y += Math.floor(day / 1461) * 4;
	day %= 1461;

	day += Math.min(Math.floor((day + 306) / 365), 3);
	y += Math.floor(day / 366);
	day %= 366;

	if(60 <= day) {
		m += 2;
		day -= 60;
		m += Math.floor(day / 153) * 5;
		day %= 153;
		m += Math.floor(day / 61) * 2;
		day %= 61;
	}
	m += Math.floor(day / 31);
	day %= 31;
	d = day + 1;

	if(y < 1) {
		return 10101;
	}
	if(9999 < y) {
		return 99991231;
	}
	return y * 10000 + m * 100 + d;
}

function @@_GetTodayDay() { // ret: Day of A.C.
	return @@_ToDate(@@_GetTodayDate());
}

function @@_GetTodayDate() { // ret: YYYYMMDD
	var ymd = new Date();

	var y = ymd.getFullYear();
	var m = ymd.getMonth() + 1;
	var d = ymd.getDate();

	return y * 10000 + m * 100 + d;
}

function @@_DayToWeekday(day) { // ret: 0-6 == Sun-Sat
	return Math.floor((day + 1) % 7);
}

function @@_DateToWeekday(date) {
	return @@_DayToWeekday(@@_ToDay(date));
}
