function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	{ // _Loaded

	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_商品名Label"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_商品名"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_商品説明Label"));
	Component_WhiteFrame_Append(coName + "_Main", Component_RichTextBox_CreateElement(coName + "_商品説明"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_カテゴリLabel"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_カテゴリ"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_テキストALabel"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_テキストA"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_テキストBLabel"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_テキストB"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Label_CreateElement(coName + "_テキストCLabel"));
	Component_WhiteFrame_Append(coName + "_Main", Component_TextBox_CreateElement(coName + "_テキストC"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Riot_Float();
	Component_WhiteFrame_Append(coName + "_Main", Component_Button_CreateElement(coName + "_Ok"));
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB());
	Component_WhiteFrame_Append(coName + "_Main", Component_Button_CreateElement(coName + "_Cancel"));
	Riot_FloatEnd();
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB()); // for Riot_FloatEnd

	} // _Loaded

	// _Shown
	Riot_Event_Later(function() {

	Component_Label_SetText(coName + "_商品名Label",		"商品名：");
	Component_Label_SetText(coName + "_商品説明Label",		"商品説明：");
	Component_Label_SetText(coName + "_カテゴリLabel",		"カテゴリ：");
	Component_Label_SetText(coName + "_テキストALabel",		"テキストＡ：");
	Component_Label_SetText(coName + "_テキストBLabel",		"テキストＢ：");
	Component_Label_SetText(coName + "_テキストCLabel",		"テキストＣ：");

	Component_TextBox_SetWidth(coName + "_テキストA", 400);
//	Component_TextBox_SetWidth(coName + "_テキストB", 600);
	Component_TextBox_SetWidth(coName + "_テキストC", 800);

	Component_Button_SetText(coName + "_Ok",		"送信");
	Component_Button_SetText(coName + "_Cancel",	"キャンセル");

	Component_Button_SetAction(coName + "_Ok", function() {
		{
			var message = "";

			if(Component_TextBox_GetText(coName + "_商品名") == "") {
				message = "商品名を入力して下さい。";
			}
			Component_TextBox_SetError(coName + "_商品名", message);
		}

		{
			var message = "";

			if(Component_RichTextBox_GetText(coName + "_商品説明") == "") {
				message = "商品説明を入力して下さい。";
			}
			Component_RichTextBox_SetError(coName + "_商品説明", message);
		}

		{
			var message = "";

			if(Component_TextBox_GetText(coName + "_カテゴリ") == "") {
				message = "カテゴリを入力して下さい。";
			}
			Component_TextBox_SetError(coName + "_カテゴリ", message);
		}

		{
			var message = "";

			if(Component_TextBox_GetText(coName + "_テキストA") == "") {
				message = "テキストＡを入力して下さい。";
			}
			Component_TextBox_SetError(coName + "_テキストA", message);
		}

		{
			var message = "";

			if(Component_TextBox_GetText(coName + "_テキストB") == "") {
				message = "テキストＢを入力して下さい。";
			}
			Component_TextBox_SetError(coName + "_テキストB", message);
		}

		{
			var message = "";

			if(Component_TextBox_GetText(coName + "_テキストC") == "") {
				message = "テキストＣを入力して下さい。";
			}
			Component_TextBox_SetError(coName + "_テキストC", message);
		}
	});

	Component_Button_SetAction(coName + "_Cancel", function() {
		Component_TextBox_SetError(coName + "_商品名", "");
		Component_RichTextBox_SetError(coName + "_商品説明", "");
		Component_TextBox_SetError(coName + "_カテゴリ", "");
		Component_TextBox_SetError(coName + "_テキストA", "");
		Component_TextBox_SetError(coName + "_テキストB", "");
		Component_TextBox_SetError(coName + "_テキストC", "");
	});

	}); // _Shown
}

riot_main = riot_testmain;
