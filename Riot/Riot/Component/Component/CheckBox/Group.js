function @@_New() {
	var info = {};

	info.Ident = Riot_Unq();
	info.SelectedCountMax = @(IMAX);

	return info;
}

// <-- new

function @@_SetSelectedCountMax(group, count) {
	group.SelectedCountMax = count;
}

function @@_GetSelectedCountMax(group) {
	return group.SelectedCountMax;
}

// <-- accessor

var @@_Default = null;

function @@_GetDefault() {
	if(@@_Default == null) {
		@@_Default = @@_New();
	}
	return @@_Default;
}

function @@_Match(a, b) {
	return a.Ident == b.Ident;
}
