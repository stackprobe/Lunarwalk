function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", Component_WhiteFrame_CreateElement(coName + "_Main"));

	Component_WhiteFrame_Append(coName + "_Main", @@_CreateElement(coName + "_Main2"));

	@@_AddKeyword(coName + "_Main2", "�L�[���[�h�`");
	@@_AddKeyword(coName + "_Main2", "�L�[���[�h�a�a");
	@@_AddKeyword(coName + "_Main2", "�L�[���[�h�b�b�b");
	@@_AddKeyword(coName + "_Main2", "1");
	@@_AddKeyword(coName + "_Main2", "2");
	@@_AddKeyword(coName + "_Main2", "3");
	@@_AddKeyword(coName + "_Main2", "��");
	@@_AddKeyword(coName + "_Main2", "��");
	@@_AddKeyword(coName + "_Main2", "��");
	@@_AddKeyword(coName + "_Main2", "��");
	@@_AddKeyword(coName + "_Main2", "��");
	@@_AddKeyword(coName + "_Main2", "��");
	@@_AddKeyword(coName + "_Main2", "�y");
}

riot_main = riot_testmain;
