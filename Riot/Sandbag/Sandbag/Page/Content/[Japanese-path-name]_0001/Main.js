function @@_Loaded(coName) {
	// noop
}

function @@_Shown(coName) {
	Riot_Get(coName + "_オンラインサロン未読数").innerText = "" + Math.floor(Math.random() * 100); // test
	Riot_Get(coName + "_ショップからのお知らせ未読数").innerText = "" + Math.floor(Math.random() * 100); // test

	Riot_Get(coName + "_店舗のお気に入り登録数").innerText = "" + Math.floor(Math.random() * 100); // test
	Riot_Get(coName + "_昨日のアクセス件数").innerText = "" + Math.floor(Math.random() * 100); // test

	@@_Addお知らせ(coName, "2019.4.10", "臨時メンテナンスのお知らせ"); // test
	@@_Addお知らせ(coName, "2019.4.1",  "定期メンテナンスのお知らせ"); // test

	for(var c = Math.floor(Math.random() * 5); 0 <= c; c--) { // test
		@@_Addお知らせ(
			coName,
			"2018." + (Math.floor(Math.random() * 12) + 1) + "." + (Math.floor(Math.random() * 28) + 1),
			"お知らせ" + Math.random()
			);
	}

	// test
	{
		var info = Component_LineGraph_GetInfo(coName + "_仮グラフ1");

		info.W = 300;
		info.H = 200;

		var cs =
		[
			"#03f",
			"#05d",
			"#07b",
			"#099",
			"#0b7",
			"#0d5",
			"#0f3",
		];

		for(var i = 1; i < cs.length; i++) {
			Component_LineGraph_AddLine(
				coName + "_仮グラフ1",
				[
					Math.random() * 100.0, // 1月
					Math.random() * 100.0, // 2月
					Math.random() * 100.0, // 3月
					Math.random() * 100.0, // 4月
					Math.random() * 100.0, // 5月
					Math.random() * 100.0, // 6月
					Math.random() * 100.0, // 7月
					Math.random() * 100.0, // 8月
					Math.random() * 100.0, // 9月
					Math.random() * 100.0, // 10月
					Math.random() * 100.0, // 11月
					Math.random() * 100.0, // 12月
				],
				cs[i]
				);
		}

		Component_LineGraph_Draw(coName + "_仮グラフ1");
	}

	// test
	{
		// コピペ
		var myChart = new Chart(Riot_Get(coName + "_仮グラフ2").getContext("2d"), {
			type: 'line',
			data:
			{
				labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
				datasets:
				[
					{
						label: 'apples',
						data: [12, 19, 3, 17, 6, 3, 7],
						backgroundColor: "rgba(153,255,51,0.4)"
					},
					{
						label: 'oranges',
						data: [2, 29, 5, 5, 2, 3, 10],
						backgroundColor: "rgba(255,153,0,0.4)"
					}
				]
			}
			});
	}
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	// noop
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Main");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

var @@_お知らせ_ID_PREFIX = "@(_PW9)";

function @@_Addお知らせ(coName, title, description) {
	var cn = coName + "_" + @@_お知らせ_ID_PREFIX + Riot_Unq();

	var t = @@_お知らせ_CreateElement(cn);

	Riot_Append(coName + "_お知らせList", t);

	Riot_Event_Add(function() {
		@@_お知らせ_SetTitle(cn, title);
		@@_お知らせ_SetDescription(cn, description);
	});

	return cn;
}
