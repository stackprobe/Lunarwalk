function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A")); // 見えないはず。
	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_B")); // 見えないはず。
	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_C")); // 見えないはず。

	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_ModalButton1"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_ModalButton2"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_ModalButton3"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_T1"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextArea_CreateElement(coName + "_T2"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_T3"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextArea_CreateElement(coName + "_T4"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB())
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_T5"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextArea_CreateElement(coName + "_T6"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());

	@@^^_Button_SetText(coName + "_ModalButton1", "Modal1");
	@@^^_Button_SetText(coName + "_ModalButton2", "Modal2");
	@@^^_Button_SetText(coName + "_ModalButton3", "Modal3");

	@@^^_Button_SetAction(coName + "_ModalButton1", function() {
		@@^_Show(coName + "_A");
	});

	@@^^_Button_SetAction(coName + "_ModalButton2", function() {
		@@^_Show(coName + "_B");
	});

	@@^^_Button_SetAction(coName + "_ModalButton3", function() {
		@@^_Show(coName + "_C");
	});

	@@^_Append(coName + "_A", @@^^_TextBox_CreateElement(coName + "_A1"));
	@@^_Append(coName + "_A", Riot_WB());
	@@^_Append(coName + "_A", @@^^_TextBox_CreateElement(coName + "_A2"));
	@@^_Append(coName + "_A", Riot_WB());
	@@^_Append(coName + "_A", @@^^_TextBox_CreateElement(coName + "_A3"));
	@@^_Append(coName + "_A", Riot_WB());
	Riot_Float();
	@@^_Append(coName + "_A", Riot_WB());
	@@^_Append(coName + "_A", @@^^_Button_CreateElement(coName + "_A4"));
	@@^_Append(coName + "_A", Riot_WB());
	@@^_Append(coName + "_A", @@^^_Button_CreateElement(coName + "_A5"));
	@@^_Append(coName + "_A", Riot_WB());
	@@^_Append(coName + "_A", @@^^_Button_CreateElement(coName + "_A6"));
	Riot_FloatEnd();
	@@^_Append(coName + "_A", Riot_WB());

	@@^_Append(coName + "_B", @@^^_TextBox_CreateElement(coName + "_B1"));
	@@^_Append(coName + "_B", Riot_WB());
	@@^_Append(coName + "_B", @@^^_TextBox_CreateElement(coName + "_B2"));
	@@^_Append(coName + "_B", Riot_WB());
	@@^_Append(coName + "_B", @@^^_TextBox_CreateElement(coName + "_B3"));
	@@^_Append(coName + "_B", Riot_WB());
	@@^_Append(coName + "_B", @@^^_TextArea_CreateElement(coName + "_B4"));
	@@^_Append(coName + "_B", Riot_WB());
	@@^_Append(coName + "_B", @@^^_TextArea_CreateElement(coName + "_B5"));
	@@^_Append(coName + "_B", Riot_WB());
	@@^_Append(coName + "_B", @@^^_TextArea_CreateElement(coName + "_B6"));
	@@^_Append(coName + "_B", Riot_WB());

	@@^_Append(coName + "_C", @@^^_Label_CreateElement(coName + "_C1"));
	@@^_Append(coName + "_C", Riot_WB());
	@@^_Append(coName + "_C", @@^^_Button_CreateElement(coName + "_C2"));
	@@^_Append(coName + "_C", Riot_WB());

	@@^^_Label_SetText(coName + "_C1", "ここにメッセージを表示します。");
}

riot_main = riot_testmain;
