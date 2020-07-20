function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	{ // _Loaded

	Riot_Float();
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupA"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupB"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupC"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupD"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupE"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupF"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupG"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupH"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupI"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupJ"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupK"));
	Component_WhiteFrame_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupL"));
	Riot_FloatEnd();
	Component_WhiteFrame_Append(coName + "_Main", Riot_WB()); // for Riot_FloatEnd

	var f = function(cn) {
		Component_GroupBox_Append(cn, Component_Label_CreateElement(cn + "_AL"));
		Component_GroupBox_Append(cn, Component_TextBox_CreateElement(cn + "_A"));
		Component_GroupBox_Append(cn, Riot_WB());
		Component_GroupBox_Append(cn, Component_Label_CreateElement(cn + "_BL"));
		Component_GroupBox_Append(cn, Component_TextBox_CreateElement(cn + "_B"));
		Component_GroupBox_Append(cn, Riot_WB());
		Component_GroupBox_Append(cn, Component_Label_CreateElement(cn + "_CL"));
		Component_GroupBox_Append(cn, Component_TextBox_CreateElement(cn + "_C"));
		Component_GroupBox_Append(cn, Riot_WB());
	};

	f(coName + "_GroupA");
	f(coName + "_GroupB");
	f(coName + "_GroupC");
	f(coName + "_GroupD");
	f(coName + "_GroupE");
	f(coName + "_GroupF");
	f(coName + "_GroupG");
	f(coName + "_GroupH");
	f(coName + "_GroupI");
	f(coName + "_GroupJ");
	f(coName + "_GroupK");
	f(coName + "_GroupL");

	} // _Loaded

	// _Shown
	Riot_Event_Later(function() {

	var f = function(cn, w, title, c, cb) {
		Component_Label_SetText(cn + "_AL", "���x���`�F");
		Component_Label_SetText(cn + "_BL", "���x���a�F");
		Component_Label_SetText(cn + "_CL", "���x���b�F");

		Component_TextBox_SetWidth(cn + "_A", w - 40);
		Component_TextBox_SetWidth(cn + "_B", w - 40);
		Component_TextBox_SetWidth(cn + "_C", w - 40);

		Component_GroupBox_SetWidth(cn, w);
		Component_GroupBox_SetTitle(cn, title);
		Component_GroupBox_SetColor(cn, c, cb);
	};

	f(coName + "_GroupA", 200, "�O���[�v�`", "#def", "#cde");
	f(coName + "_GroupB", 200, "�O���[�v�a", "#edf", "#dce");
	f(coName + "_GroupC", 200, "�O���[�v�b", "#fde", "#ecd");
	f(coName + "_GroupD", 600, "�O���[�v�c", "#fed", "#edc");
	f(coName + "_GroupE", 400, "�O���[�v�d", "#dfe", "#ced");
	f(coName + "_GroupF", 400, "�O���[�v�e", "#efd", "#dec");
	f(coName + "_GroupG", 200, "�O���[�v�f", "#def", "#cde");
	f(coName + "_GroupH", 200, "�O���[�v�g", "#edf", "#dce");
	f(coName + "_GroupI", 200, "�O���[�v�h", "#fde", "#ecd");
	f(coName + "_GroupJ", 600, "�O���[�v�i", "#fed", "#edc");
	f(coName + "_GroupK", 400, "�O���[�v�j", "#dfe", "#ced");
	f(coName + "_GroupL", 400, "�O���[�v�k", "#efd", "#dec");

	}); // _Shown
}

riot_main = riot_testmain;
