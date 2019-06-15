function riot_testmain() {
	var coName = "@(GLOBAL)_test_root";

	Riot_Append("BODY", @@_CreateElement(coName + "_Main"));

	// later
	Riot_Event_Later(function() {

	@@_SetDate(coName + "_Main", Riot_DateToDay_GetTodayDate());

	});
}

riot_main = riot_testmain;
