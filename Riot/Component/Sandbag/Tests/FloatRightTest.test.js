function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	{ // _Loaded

	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_Label"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	Component_WhiteFrame_Append(coName + "_Main", Component_Button_CreateElement(coName + "_A"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Button_CreateElement(coName + "_B"));
	Riot_FloatRight();
	Component_WhiteFrame_Append(coName + "_Main", Component_Button_CreateElement(coName + "_C"));
	Riot_FloatEnd();
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB()); // for Riot_FloatEnd

	} // _Loaded

	// _Shown
	Riot_Event_Later(function() {

	Component_Label_SetText(coName + "_Label", "ラベル");

	Component_Button_SetText(coName + "_A", "送信Ａ");
	Component_Button_SetText(coName + "_B", "送信Ｂ");
	Component_Button_SetText(coName + "_C", "キャンセル");

	}); // _Shown
}

riot_main = riot_testmain;
