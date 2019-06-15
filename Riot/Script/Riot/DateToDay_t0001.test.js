function riot_testmain() {
	Riot_Get("BODY").innerText = "Show Console";

	console.log(@@^_ToDay(10101));
	console.log(@@^_ToDay(10102));
	console.log(@@^_ToDay(10103));

	console.log(@@^_ToDay(10000101));
	console.log(@@^_ToDay(10000201));
	console.log(@@^_ToDay(10000301));

	console.log(@@^_ToDate(@@^_ToDay(10000101)));
	console.log(@@^_ToDate(@@^_ToDay(10000201)));
	console.log(@@^_ToDate(@@^_ToDay(10000301)));

	console.log(@@^_ToDay(99991229));
	console.log(@@^_ToDay(99991230));
	console.log(@@^_ToDay(99991231));

	console.log(@@^_ToDate(@@^_ToDay(99991229)));
	console.log(@@^_ToDate(@@^_ToDay(99991230)));
	console.log(@@^_ToDate(@@^_ToDay(99991231)));

	@@_Test01();
}

function @@_Test01() {
	var date = 10101;
	var day = 0;

	@(LOGPOS)

	for(; ; ) {
		if(day % 500000 == 0) {
			console.log(date + " " + day);
		}

		if(@@^_ToDay(date) != day) {
			throw null; // bugged !!!
		}
		if(@@^_ToDate(day) != date) {
			throw null; // bugged !!!
		}

		{
			var y = Math.floor(date / 10000);
			var m = Math.floor(date / 100) % 100;
			var d = date % 100;

			if(@@_GetLastDayOfMonth(y, m) <= d) {
				d = 1;

				if(12 <= m) {
					m = 1;

					if(9999 <= y) {
						break;
					}
					y++;
				}
				else {
					m++;
				}
			}
			else {
				d++;
			}
			date = y * 10000 + m * 100 + d;
		}

		day++;
	}

	@(LOGPOS)
}

function @@_GetLastDayOfMonth(y, m) {
	switch(m) {
	case  1: return 31;
	case  2: return @@_Is‚¤‚é‚¤”N(y) ? 29 : 28;
	case  3: return 31;
	case  4: return 30;
	case  5: return 31;
	case  6: return 30;
	case  7: return 31;
	case  8: return 31;
	case  9: return 30;
	case 10: return 31;
	case 11: return 30;
	case 12: return 31;
	}
}

function @@_Is‚¤‚é‚¤”N(y) {
	return (Math.floor(y % 4) == 0 && Math.floor(y % 100) != 0) || Math.floor(y % 400) == 0;
}

riot_main = riot_testmain;
