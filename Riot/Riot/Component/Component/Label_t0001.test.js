function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	Riot_Float();
	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_A"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_B"));
//	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_C"));
	Riot_FloatEnd();
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetTextA"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetTextB"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetTextC"));
	Riot_FloatEnd();
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Text"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetWidthA"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetWidthB"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetWidthC"));
	Riot_FloatEnd();
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Width"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetAlignA"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetAlignB"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetAlignC"));
	Riot_FloatEnd();
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Align"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetColorA"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetColorB"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetColorC"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetBackgroundColorA"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetBackgroundColorB"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetBackgroundColorC"));
	Riot_FloatEnd();
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Color"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetPaddingA"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetPaddingB"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetPaddingC"));
	Riot_FloatEnd();
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_PaddingL"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_PaddingT"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_PaddingR"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_PaddingB"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());

	@@^^_Button_SetText(coName + "_SetTextA", "SetText A");
	@@^^_Button_SetText(coName + "_SetTextB", "SetText B");
	@@^^_Button_SetText(coName + "_SetTextC", "SetText C");

	@@^^_TextBox_SetText(coName + "_Text", "ƒ‰ƒxƒ‹");

	@@^^_Button_SetAction(coName + "_SetTextA", function() {
		var text = @@^^_TextBox_GetText(coName + "_Text");

		@@^_SetText(coName + "_A", text);
	});
	@@^^_Button_SetAction(coName + "_SetTextB", function() {
		var text = @@^^_TextBox_GetText(coName + "_Text");

		@@^_SetText(coName + "_B", text);
	});
	@@^^_Button_SetAction(coName + "_SetTextC", function() {
		var text = @@^^_TextBox_GetText(coName + "_Text");

		@@^_SetText(coName + "_C", text);
	});

	@@^^_Button_SetText(coName + "_SetWidthA", "SetWidth A");
	@@^^_Button_SetText(coName + "_SetWidthB", "SetWidth B");
	@@^^_Button_SetText(coName + "_SetWidthC", "SetWidth C");

	@@^^_TextBox_SetText(coName + "_Width", "-1");

	@@^^_Button_SetAction(coName + "_SetWidthA", function() {
		var w = parseInt(@@^^_TextBox_GetText(coName + "_Width"));

		@@^_SetWidth(coName + "_A", w);
	});
	@@^^_Button_SetAction(coName + "_SetWidthB", function() {
		var w = parseInt(@@^^_TextBox_GetText(coName + "_Width"));

		@@^_SetWidth(coName + "_B", w);
	});
	@@^^_Button_SetAction(coName + "_SetWidthC", function() {
		var w = parseInt(@@^^_TextBox_GetText(coName + "_Width"));

		@@^_SetWidth(coName + "_C", w);
	});

	@@^^_Button_SetText(coName + "_SetAlignA", "SetAlign A");
	@@^^_Button_SetText(coName + "_SetAlignB", "SetAlign B");
	@@^^_Button_SetText(coName + "_SetAlignC", "SetAlign C");

	@@^^_TextBox_SetText(coName + "_Align", "L");

	@@^^_Button_SetAction(coName + "_SetAlignA", function() {
		var align = @@^^_TextBox_GetText(coName + "_Align");

		@@^_SetAlign(coName + "_A", align);
	});
	@@^^_Button_SetAction(coName + "_SetAlignB", function() {
		var align = @@^^_TextBox_GetText(coName + "_Align");

		@@^_SetAlign(coName + "_B", align);
	});
	@@^^_Button_SetAction(coName + "_SetAlignC", function() {
		var align = @@^^_TextBox_GetText(coName + "_Align");

		@@^_SetAlign(coName + "_C", align);
	});

	@@^^_Button_SetText(coName + "_SetColorA", "SetColor A");
	@@^^_Button_SetText(coName + "_SetColorB", "SetColor B");
	@@^^_Button_SetText(coName + "_SetColorC", "SetColor C");
	@@^^_Button_SetText(coName + "_SetBackgroundColorA", "SetBackgroundColor A");
	@@^^_Button_SetText(coName + "_SetBackgroundColorB", "SetBackgroundColor B");
	@@^^_Button_SetText(coName + "_SetBackgroundColorC", "SetBackgroundColor C");

	@@^^_TextBox_SetText(coName + "_Color", "#08f");

	@@^^_Button_SetAction(coName + "_SetColorA", function() {
		var color = @@^^_TextBox_GetText(coName + "_Color");

		@@^_SetColor(coName + "_A", color);
	});
	@@^^_Button_SetAction(coName + "_SetColorB", function() {
		var color = @@^^_TextBox_GetText(coName + "_Color");

		@@^_SetColor(coName + "_B", color);
	});
	@@^^_Button_SetAction(coName + "_SetColorC", function() {
		var color = @@^^_TextBox_GetText(coName + "_Color");

		@@^_SetColor(coName + "_C", color);
	});
	@@^^_Button_SetAction(coName + "_SetBackgroundColorA", function() {
		var color = @@^^_TextBox_GetText(coName + "_Color");

		@@^_SetBackgroundColor(coName + "_A", color);
	});
	@@^^_Button_SetAction(coName + "_SetBackgroundColorB", function() {
		var color = @@^^_TextBox_GetText(coName + "_Color");

		@@^_SetBackgroundColor(coName + "_B", color);
	});
	@@^^_Button_SetAction(coName + "_SetBackgroundColorC", function() {
		var color = @@^^_TextBox_GetText(coName + "_Color");

		@@^_SetBackgroundColor(coName + "_C", color);
	});

	@@^^_Button_SetText(coName + "_SetPaddingA", "SetPadding A");
	@@^^_Button_SetText(coName + "_SetPaddingB", "SetPadding B");
	@@^^_Button_SetText(coName + "_SetPaddingC", "SetPadding C");

	@@^^_TextBox_SetText(coName + "_PaddingL", "0");
	@@^^_TextBox_SetText(coName + "_PaddingT", "0");
	@@^^_TextBox_SetText(coName + "_PaddingR", "0");
	@@^^_TextBox_SetText(coName + "_PaddingB", "0");

	@@^^_Button_SetAction(coName + "_SetPaddingA", function() {
		var l = parseInt(@@^^_TextBox_GetText(coName + "_PaddingL"));
		var t = parseInt(@@^^_TextBox_GetText(coName + "_PaddingT"));
		var r = parseInt(@@^^_TextBox_GetText(coName + "_PaddingR"));
		var b = parseInt(@@^^_TextBox_GetText(coName + "_PaddingB"));

		@@^_SetPadding(coName + "_A", l, t, r, b);
	});
	@@^^_Button_SetAction(coName + "_SetPaddingB", function() {
		var l = parseInt(@@^^_TextBox_GetText(coName + "_PaddingL"));
		var t = parseInt(@@^^_TextBox_GetText(coName + "_PaddingT"));
		var r = parseInt(@@^^_TextBox_GetText(coName + "_PaddingR"));
		var b = parseInt(@@^^_TextBox_GetText(coName + "_PaddingB"));

		@@^_SetPadding(coName + "_B", l, t, r, b);
	});
	@@^^_Button_SetAction(coName + "_SetPaddingC", function() {
		var l = parseInt(@@^^_TextBox_GetText(coName + "_PaddingL"));
		var t = parseInt(@@^^_TextBox_GetText(coName + "_PaddingT"));
		var r = parseInt(@@^^_TextBox_GetText(coName + "_PaddingR"));
		var b = parseInt(@@^^_TextBox_GetText(coName + "_PaddingB"));

		@@^_SetPadding(coName + "_C", l, t, r, b);
	});

	// later
	Riot_Event_Later(function() {

	}); // later
}

riot_main = riot_testmain;
