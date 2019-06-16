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
		console.log("rows[" + i + "]: " + rows[i]); // row1 �` row4 �Ɠ����͂��B
	}

	// row1 �` row4 �� coName

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

	@@^^_Label_SetText(coName + "_Text1Label", "�e�L�X�g�P���x���F");

	@@^^_Label_SetText(coName + "_Text2ALabel", "�e�L�X�g�Q�`���x���F");
	@@^^_Label_SetText(coName + "_Text2BLabel", "�e�L�X�g�Q�a���x���F");

	@@^^_Label_SetText(coName + "_Text3ALabel", "�e�L�X�g�R�`���x���F");
	@@^^_Label_SetText(coName + "_Text3BLabel", "�e�L�X�g�R�a���x���F");
	@@^^_Label_SetText(coName + "_Text3CLabel", "�e�L�X�g�R�b���x���F");

	@@^^_Label_SetText(coName + "_Text4ALabel", "�e�L�X�g�S�`���x���F");
	@@^^_Label_SetText(coName + "_Text4BLabel", "�e�L�X�g�S�a���x���F");
	@@^^_Label_SetText(coName + "_Text4CLabel", "�e�L�X�g�S�b���x���F");
	@@^^_Label_SetText(coName + "_Text4DLabel", "�e�L�X�g�S�c���x���F");

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
