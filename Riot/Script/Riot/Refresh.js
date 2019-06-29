var @@_Routines = new Map();

function @@_Add(tagId, refresh, dispose) {
	@@_Slim();
	@@_Routines.set(tagId, [ refresh, dispose ]);
}

var @@_EV_SLIM = "@(_UNQ)";

function @@_Slim() {
	Riot_Event_Set(@@_EV_SLIM, @@_SlimMain);
}

function @@_RunSlim() {
	Riot_Event_Run(@@_EV_SLIM);
}

function @@_SlimMain() {
	var tagIds = Riot_GetMapKeys(@@_Routines);

	for(var i = 0; i < tagIds.length; i++) {
		var tagId = tagIds[i];

		if(document.getElementById(tagId) == null) {
			@@_Routines.get(tagId)[1](); // dispose
			@@_Routines.delete(tagId);
		}
	}
}

function @@_Fire() {
	Riot_Event_Set("@(_UNQ)", @@_FireMain);
}

function @@_FireMain() {
	var tagIds = Riot_GetMapKeys(@@_Routines);

	for(var i = 0; i < tagIds.length; i++) {
		var tagId = tagIds[i];

		if(document.getElementById(tagId) == null) {
			@@_Routines.get(tagId)[1](); // dispose
			@@_Routines.delete(tagId);
		}
		else {
			@@_Routines.get(tagId)[0](); // refresh
		}
	}
}
