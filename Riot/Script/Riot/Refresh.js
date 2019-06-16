var @@_Routines = new Map();

function @@_Add(tagId, refresh, dispose) {
	Riot_Event_Set("@(_UNQ)", @@_Slimdown);
	@@_Routines.set(tagId, [ refresh, dispose ]);
}

function @@_Slimdown() {
	var tagIds = Riot_GetMapKeys(@@_Routines);

	for(var i = 0; i < tagIds.length; i++) {
		var tagId = tagIds[i];

		if(document.getElementById(tagId) == null) {
			@@_Routines.get(tagId)[1](); // dispose
			@@_Routines.delete(tagId);
		}
	}
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

function @@_Fire() {
	Riot_Event_Set("@(_UNQ)", @@_FireMain);
}
