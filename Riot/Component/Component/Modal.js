function @@_Loaded(coName) {
	Riot_Store.set(coName, {});
}

function @@_Shown(coName) {
	// noop
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	Riot_Store.delete(coName);
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Root");
}

function @@_Append(coName, tag) {
	Riot_Append(coName + "_Board", tag);
}

function @@_Show(coName) {
	Riot_Get(coName + "_Wall")		.style.display = "block";
	Riot_Get(coName + "_Board")		.style.display = "block";

	document.body.style.overflow = "hidden"; // ó†ë§ÇÃÉXÉNÉçÅ[Éãó}é~
}

function @@_Hide(coName) {
	Riot_Get(coName + "_Wall")		.style.display = "none";
	Riot_Get(coName + "_Board")		.style.display = "none";

	document.body.style.overflow = ""; // ïúå≥
}
