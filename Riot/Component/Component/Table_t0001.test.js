function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_Main2"));

	// later
	Riot_Event_Add(function() {

	@@^_AddColumn(coName + "_Main2", "��", 80);
	@@^_AddColumn(coName + "_Main2", "�{��", 300);
	@@^_AddColumn(coName + "_Main2", "�z�M����", 200);
	@@^_AddColumn(coName + "_Main2", "�I������", 200);
	@@^_AddColumn(coName + "_Main2", "", 80); // �ҏW

	@@^_SetRowHeight(coName + "_Main2", 40);

	for(var c = 0; c < 10; c++) {
		// later
		Riot_Event_Add(function() {

		var row = @@^_AddRow(coName + "_Main2");

		console.log("row.1: " + row); // test

		// later
		Riot_Event_Add(function() {

		console.log("row.2: " + row); // test

		// ��
		{
			// later
			Riot_Event_Add(function() {

			var cn = coName + "_" + Riot_Unq();
			var cell = @@^^_Label_CreateElement(cn);

			@@^_Row_AddCell(row, cell);

			console.log("cn.@(_LINE): " + cn); // test

			// later
			Riot_Event_Add(function() {

			console.log("cn.@(_LINE): " + cn); // test

			@@^^_Label_SetText(cn, "----");

			}); // leter
			}); // leter
		}

		// �{��
		{
			// later
			Riot_Event_Add(function() {

			var cn = coName + "_" + Riot_Unq();
			var cell = @@^^_Label_CreateElement(cn);

			@@^_Row_AddCell(row, cell);

			console.log("cn.@(_LINE): " + cn); // test

			// later
			Riot_Event_Add(function() {

			console.log("cn.@(_LINE): " + cn); // test

			@@^^_Label_SetText(cn, "----");

			}); // leter
			}); // leter
		}

		// �z�M����
		{
			// later
			Riot_Event_Add(function() {

			var cn = coName + "_" + Riot_Unq();
			var cell = @@^^_Label_CreateElement(cn);

			@@^_Row_AddCell(row, cell);

			console.log("cn.@(_LINE): " + cn); // test

			// later
			Riot_Event_Add(function() {

			console.log("cn.@(_LINE): " + cn); // test

			@@^^_Label_SetText(cn, "----/--/-- (--) --:--");

			}); // leter
			}); // leter
		}

		// �z�M����
		{
			// later
			Riot_Event_Add(function() {

			var cn = coName + "_" + Riot_Unq();
			var cell = @@^^_Label_CreateElement(cn);

			@@^_Row_AddCell(row, cell);

			console.log("cn.@(_LINE): " + cn); // test

			// later
			Riot_Event_Add(function() {

			console.log("cn.@(_LINE): " + cn); // test

			@@^^_Label_SetText(cn, "----/--/-- (--) --:--");

			}); // leter
			}); // leter
		}

		// �ҏW
		{
			// later
			Riot_Event_Add(function() {

			var cn = coName + "_" + Riot_Unq();
			var cell = @@^^_Button_CreateElement(cn);

			@@^_Row_AddCell(row, cell);

			console.log("cn.@(_LINE): " + cn); // test

			// later
			Riot_Event_Add(function() {

			console.log("cn.@(_LINE): " + cn); // test

			@@^^_Button_SetText(cn, "�ҏW");
			@@^^_Button_SetHeight(cn, 30);

			}); // leter
			}); // leter
		}

		}); // leter
		}); // leter
	}

	}); // leter

	Riot_Refresh_Fire();
}

riot_main = riot_testmain;
