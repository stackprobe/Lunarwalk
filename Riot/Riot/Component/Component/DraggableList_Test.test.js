function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^_CreateElement(coName + "_Main"));

	var row1 = @@^_AddRow(coName + "_Main");
	var row2 = @@^_AddRow(coName + "_Main");
	var row3 = @@^_AddRow(coName + "_Main");
	var row4 = @@^_AddRow(coName + "_Main");

	console.log("row1: " + row1);
	console.log("row2: " + row2);
	console.log("row3: " + row3);
	console.log("row4: " + row4);

	var rows = @@^_GetRows(coName + "_Main");

	for(var i = 0; i < rows.length; i++) {
		console.log("rows[" + i + "]: " + rows[i]); // row1 ～ row4 と同じはず。
	}

	// row1 ～ row4 は coName

	@@^_Row_Append(row1, @@^^_Label_CreateElement(coName + "_Text1Label"));
	@@^_Row_Append(row1, @@^^_TextBox_CreateElement(coName + "_Text1"));
	@@^_Row_Append(row1, Riot_WB());
	@@^_Row_Append(row1, Riot_WB());

	@@^_Row_Append(row2, @@^^_Label_CreateElement(coName + "_Text2ALabel"));
	@@^_Row_Append(row2, @@^^_TextBox_CreateElement(coName + "_Text2A"));
	@@^_Row_Append(row2, Riot_WB());
	@@^_Row_Append(row2, @@^^_Label_CreateElement(coName + "_Text2BLabel"));
	@@^_Row_Append(row2, @@^^_TextBox_CreateElement(coName + "_Text2B"));
	@@^_Row_Append(row2, Riot_WB());
	@@^_Row_Append(row2, Riot_WB());

	@@^_Row_Append(row3, @@^^_Label_CreateElement(coName + "_Text3ALabel"));
	@@^_Row_Append(row3, @@^^_TextBox_CreateElement(coName + "_Text3A"));
	@@^_Row_Append(row3, Riot_WB());
	@@^_Row_Append(row3, @@^^_Label_CreateElement(coName + "_Text3BLabel"));
	@@^_Row_Append(row3, @@^^_TextBox_CreateElement(coName + "_Text3B"));
	@@^_Row_Append(row3, Riot_WB());
	@@^_Row_Append(row3, @@^^_Label_CreateElement(coName + "_Text3CLabel"));
	@@^_Row_Append(row3, @@^^_TextBox_CreateElement(coName + "_Text3C"));
	@@^_Row_Append(row3, Riot_WB());
	@@^_Row_Append(row3, Riot_WB());

	@@^_Row_Append(row4, @@^^_Label_CreateElement(coName + "_Text4ALabel"));
	@@^_Row_Append(row4, @@^^_TextBox_CreateElement(coName + "_Text4A"));
	@@^_Row_Append(row4, Riot_WB());
	@@^_Row_Append(row4, @@^^_Label_CreateElement(coName + "_Text4BLabel"));
	@@^_Row_Append(row4, @@^^_TextBox_CreateElement(coName + "_Text4B"));
	@@^_Row_Append(row4, Riot_WB());
	@@^_Row_Append(row4, @@^^_Label_CreateElement(coName + "_Text4CLabel"));
	@@^_Row_Append(row4, @@^^_TextBox_CreateElement(coName + "_Text4C"));
	@@^_Row_Append(row4, Riot_WB());
	@@^_Row_Append(row4, @@^^_Label_CreateElement(coName + "_Text4DLabel"));
	@@^_Row_Append(row4, @@^^_TextBox_CreateElement(coName + "_Text4D"));
	@@^_Row_Append(row4, Riot_WB());
	@@^_Row_Append(row4, Riot_WB());

	@@^^_Label_SetText(coName + "_Text1Label", "テキスト１ラベル：");

	@@^^_Label_SetText(coName + "_Text2ALabel", "テキスト２Ａラベル：");
	@@^^_Label_SetText(coName + "_Text2BLabel", "テキスト２Ｂラベル：");

	@@^^_Label_SetText(coName + "_Text3ALabel", "テキスト３Ａラベル：");
	@@^^_Label_SetText(coName + "_Text3BLabel", "テキスト３Ｂラベル：");
	@@^^_Label_SetText(coName + "_Text3CLabel", "テキスト３Ｃラベル：");

	@@^^_Label_SetText(coName + "_Text4ALabel", "テキスト４Ａラベル：");
	@@^^_Label_SetText(coName + "_Text4BLabel", "テキスト４Ｂラベル：");
	@@^^_Label_SetText(coName + "_Text4CLabel", "テキスト４Ｃラベル：");
	@@^^_Label_SetText(coName + "_Text4DLabel", "テキスト４Ｄラベル：");

	// later
	Riot_Event_Later(function() {

	@@^_Row_TellTextBox(row1, coName + "_Text1");

	@@^_Row_TellTextBox(row2, coName + "_Text2A");
	@@^_Row_TellTextBox(row2, coName + "_Text2B");

	@@^_Row_TellTextBox(row3, coName + "_Text3A");
	@@^_Row_TellTextBox(row3, coName + "_Text3B");
	@@^_Row_TellTextBox(row3, coName + "_Text3C");

	@@^_Row_TellTextBox(row4, coName + "_Text4A");
	@@^_Row_TellTextBox(row4, coName + "_Text4B");
	@@^_Row_TellTextBox(row4, coName + "_Text4C");
	@@^_Row_TellTextBox(row4, coName + "_Text4D");

	});
}

riot_main = riot_testmain;
