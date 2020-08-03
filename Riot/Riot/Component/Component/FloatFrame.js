function @@_Loaded(coName) {
	// noop
}

function @@_Shown(coName) {
	// noop
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	// noop
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Frame");
}

function @@_Append(coName, tag) {



	// HACK
	if(tag.style.float != "right") {
		Riot_SetFloat(tag);
	}



	Riot_Get(coName + "_Frame").insertBefore(tag, Riot_Get(coName + "_EndOfElements"));
}
