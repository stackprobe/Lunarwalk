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
	return Riot_Get(coName + "_Box");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_LoginPressed(coName) {
	var email    = @@_TextBox_GetText(coName + "_Email");
	var password = @@_TextBox_GetText(coName + "_Password");

	console.log(email + ":" + password);

	if(email == "1111" && password == "9999") {
		Riot_Set("BODY", Page_Root_CreateElement("riot_root"));
	}
	else {
		Component_Label_SetText(coName + "_ErrorMessage", "Email Ç‹ÇΩÇÕ Password Ç™à·Ç¢Ç‹Ç∑ÅB(Email 1111 , Password 9999 Ç≈Ç∑)");
	}
}
