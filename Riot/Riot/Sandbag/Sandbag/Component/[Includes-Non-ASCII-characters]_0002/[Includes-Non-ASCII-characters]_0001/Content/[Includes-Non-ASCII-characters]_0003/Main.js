function @@_Loaded(coName) {
	Riot_Float();
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupA"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupB"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupC"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupD"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupE"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupF"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupG"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupH"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupI"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupJ"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupK"));
	Riot_Append(coName + "_Main", Component_GroupBox_CreateElement(coName + "_GroupL"));
	Riot_FloatEnd();
	Riot_Append(coName + "_Main", Riot_WB()); // for Riot_FloatEnd

	var f = function(cn) {
		Component_GroupBox_Append(cn, Component_Label_CreateElement(cn + "AL"));
		Component_GroupBox_Append(cn, Component_TextBox_CreateElement(cn + "A"));
		Component_GroupBox_Append(cn, Riot_WB());
		Component_GroupBox_Append(cn, Component_Label_CreateElement(cn + "BL"));
		Component_GroupBox_Append(cn, Component_TextBox_CreateElement(cn + "B"));
		Component_GroupBox_Append(cn, Riot_WB());
		Component_GroupBox_Append(cn, Component_Label_CreateElement(cn + "CL"));
		Component_GroupBox_Append(cn, Component_TextBox_CreateElement(cn + "C"));
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
}

function @@_Shown(coName) {
	var f = function(cn, w, title, c, cb) {
		Component_TextBox_SetWidth(cn + "A", w - 40);
		Component_TextBox_SetWidth(cn + "B", w - 40);
		Component_TextBox_SetWidth(cn + "C", w - 40);

		Component_GroupBox_SetWidth(cn, w);
		Component_GroupBox_SetTitle(cn, title);
		Component_GroupBox_SetColor(cn, c, cb);
	};

	f(coName + "_GroupA", 200, "グループＡ", "#def", "#cde");
	f(coName + "_GroupB", 200, "グループＢ", "#edf", "#dce");
	f(coName + "_GroupC", 200, "グループＣ", "#fde", "#ecd");
	f(coName + "_GroupD", 600, "グループＤ", "#fed", "#edc");
	f(coName + "_GroupE", 400, "グループＥ", "#dfe", "#ced");
	f(coName + "_GroupF", 400, "グループＦ", "#efd", "#dec");
	f(coName + "_GroupG", 200, "グループＧ", "#def", "#cde");
	f(coName + "_GroupH", 200, "グループＨ", "#edf", "#dce");
	f(coName + "_GroupI", 200, "グループＩ", "#fde", "#ecd");
	f(coName + "_GroupJ", 600, "グループＪ", "#fed", "#edc");
	f(coName + "_GroupK", 400, "グループＫ", "#dfe", "#ced");
	f(coName + "_GroupL", 400, "グループＬ", "#efd", "#dec");
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
