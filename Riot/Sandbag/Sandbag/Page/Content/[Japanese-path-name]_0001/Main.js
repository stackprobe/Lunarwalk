function @@_Loaded(coName) {
	// noop
}

function @@_Shown(coName) {
	Riot_Get(coName + "_�I�����C���T�������ǐ�").innerText = "" + Math.floor(Math.random() * 100); // test
	Riot_Get(coName + "_�V���b�v����̂��m�点���ǐ�").innerText = "" + Math.floor(Math.random() * 100); // test

	Riot_Get(coName + "_�X�܂̂��C�ɓ���o�^��").innerText = "" + Math.floor(Math.random() * 100); // test
	Riot_Get(coName + "_����̃A�N�Z�X����").innerText = "" + Math.floor(Math.random() * 100); // test

	@@_Add���m�点(coName, "2019.4.10", "�Վ������e�i���X�̂��m�点"); // test
	@@_Add���m�点(coName, "2019.4.1",  "��������e�i���X�̂��m�点"); // test

	for(var c = Math.floor(Math.random() * 5); 0 <= c; c--) { // test
		@@_Add���m�点(
			coName,
			"2018." + (Math.floor(Math.random() * 12) + 1) + "." + (Math.floor(Math.random() * 28) + 1),
			"���m�点" + Math.random()
			);
	}

	// test
	{
		var info = Component_LineGraph_GetInfo(coName + "_���O���t1");

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
				coName + "_���O���t1",
				[
					Math.random() * 100.0, // 1��
					Math.random() * 100.0, // 2��
					Math.random() * 100.0, // 3��
					Math.random() * 100.0, // 4��
					Math.random() * 100.0, // 5��
					Math.random() * 100.0, // 6��
					Math.random() * 100.0, // 7��
					Math.random() * 100.0, // 8��
					Math.random() * 100.0, // 9��
					Math.random() * 100.0, // 10��
					Math.random() * 100.0, // 11��
					Math.random() * 100.0, // 12��
				],
				cs[i]
				);
		}

		Component_LineGraph_Draw(coName + "_���O���t1");
	}

	// test
	{
		// �R�s�y
		var myChart = new Chart(Riot_Get(coName + "_���O���t2").getContext("2d"), {
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

var @@_���m�点_ID_PREFIX = "@(_PW9)";

function @@_Add���m�点(coName, title, description) {
	var cn = coName + "_" + @@_���m�点_ID_PREFIX + Riot_Unq();

	var t = @@_���m�点_CreateElement(cn);

	Riot_Append(coName + "_���m�点List", t);

	Riot_Event_Add(function() {
		@@_���m�点_SetTitle(cn, title);
		@@_���m�点_SetDescription(cn, description);
	});

	return cn;
}
