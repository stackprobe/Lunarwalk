function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	@@_AddImage(coName + "_Main", "@(GLOBAL)_@@^_ImageOnImage_Guitar.png", "Guitar", 500, 450);
	@@_AddImage(coName + "_Main", "@(GLOBAL)_@@^_ImageOnImage_�֎q.png", "�֎q", 200, 350);
	@@_AddImage(coName + "_Main", "@(GLOBAL)_@@^_ImageOnImage_�G��.png", "�G��", 450, 200);

	// later
	Riot_Event_Later(function() {

	@@_Changed(coName + "_Main");

	}); // later
}

riot_main = riot_testmain;
