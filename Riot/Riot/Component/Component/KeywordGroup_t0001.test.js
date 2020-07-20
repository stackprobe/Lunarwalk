function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@^^_WhiteFrame_CreateElement(coName + "_Main"));

	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Label_CreateElement(coName + "_SubCategoryLabel"));
	@@^^_WhiteFrame_Append(coName + "_Main", @@^_CreateElement(coName + "_SubCategory"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_GetKeywords"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_GetSelectedKeywords"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_GetNotSelectedKeywords"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_Button_CreateElement(coName + "_SetSelectedKeywords"));
	@@^^_WhiteFrame_Append(coName + "_Main", Riot_WB());
	@@^^_WhiteFrame_Append(coName + "_Main", @@^^_TextBox_CreateElement(coName + "_Keywords"));

	@@^^_Label_SetText(coName + "_SubCategoryLabel",	"サブカテゴリー");
	@@^^_Label_SetColor(coName + "_SubCategoryLabel",	"#4aa");

	@@^^_Button_SetText(coName + "_GetKeywords",				"GetKeywords");
	@@^^_Button_SetText(coName + "_GetSelectedKeywords",		"GetSelectedKeywords");
	@@^^_Button_SetText(coName + "_GetNotSelectedKeywords",		"GetNotSelectedKeywords");
	@@^^_Button_SetText(coName + "_SetSelectedKeywords",		"SetSelectedKeywords");

	@@^^_TextBox_SetWidth(coName + "_Keywords", 1200);

	@@^^_Button_SetAction(coName + "_GetKeywords", function() {
		var keywords = Riot_Join(", ", @@^^_KeywordGroup_GetKeywords(coName + "_SubCategory"));

		@@^^_TextBox_SetText(coName + "_Keywords", keywords);
	});
	@@^^_Button_SetAction(coName + "_GetSelectedKeywords", function() {
		var keywords = Riot_Join(", ", @@^^_KeywordGroup_GetSelectedKeywords(coName + "_SubCategory"));

		@@^^_TextBox_SetText(coName + "_Keywords", keywords);
	});
	@@^^_Button_SetAction(coName + "_GetNotSelectedKeywords", function() {
		var keywords = Riot_Join(", ", @@^^_KeywordGroup_GetNotSelectedKeywords(coName + "_SubCategory"));

		@@^^_TextBox_SetText(coName + "_Keywords", keywords);
	});
	@@^^_Button_SetAction(coName + "_SetSelectedKeywords", function() {
		var keywords = Riot_Split(@@^^_TextBox_GetText(coName + "_Keywords"), ", ");

		@@^^_KeywordGroup_SetSelectedKeywords(coName + "_SubCategory", keywords);
	});

	var keywords = [
		"インテリア",
		"雑貨",
		"インテリア・雑貨",
		"不動産",
		"住宅",
		"不動産・住宅",
		"リフォーム",
		"住宅設備",
		"地域情報",
		"地ビール",
		"ワイン",
		"スイーツ",
		"珈琲",
		"紅茶",
		"珈琲・紅茶",
	];

	for(var i = 0; i < keywords.length; i++) {
		@@^_AddKeyword(coName + "_SubCategory", keywords[i]);
	}
}

riot_main = riot_testmain;
