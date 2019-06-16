function @@_Loaded(coName) {
	Riot_Store.set(coName, {});

	@@_LoadImage("@(GLOBAL)_@@^_ImageOnImage_ïîâÆ.png", function(img) { @@_ImgïîâÆ = img; });
}

function @@_Shown(coName) {
	Component_KeywordGroup_AddChanged(coName + "_Images", function() { @@_Changed(coName); });

//	@@_Changed(coName); // Ç±Ç±Ç∂Ç·Ç‹ÇæëÅÇ¢ÅB
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

var @@_ImgïîâÆ;
var @@_Imgs = [];

function @@_LoadImage(src, setter) {
	var img;

	Riot_Event_Chain_Add(function(next) {
		img = new Image();
		img.onload = next;
		img.onerror = Riot_Panic;
		img.src = src;
	});

	Riot_Event_Chain_Post(function() {
		setter(img);
	});
}

function @@_AddImage(coName, src, name, x, y) {
	var img = {
		Image: "", // dummy
		Name: name,
		X: x,
		Y: y,
	};

	@@_LoadImage(src, function(image) { img.Image = image; });

	@@_Imgs.push(img);

	Component_KeywordGroup_AddKeyword(coName + "_Images", name);
}

function @@_Changed(coName) {
	var canvas = Riot_Get(coName + "_Canvas");
	var context = canvas.getContext("2d");

	context.drawImage(@@_ImgïîâÆ, 0, 0);

	var names = Component_KeywordGroup_GetSelectedKeywords(coName + "_Images");

	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var index = Riot_Array_IndexOfMatch(@@_Imgs, function(v) { return v.Name == name; });

		if(index != -1) {
			context.drawImage(@@_Imgs[index].Image, @@_Imgs[index].X, @@_Imgs[index].Y);
		}
	}
}
