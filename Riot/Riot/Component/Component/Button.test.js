function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	@@_SetText(coName + "_Main", "�����ĉ�����");
	@@_SetAction(coName + "_Main", function() { alert("�{�^����������܂����B"); });
}

riot_main = riot_testmain;
