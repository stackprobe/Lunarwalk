function @@_Loaded(coName) {
	Riot_Store.set(coName, {});
}

var @@_Img•”‰®;
var @@_ImgGuitar;
var @@_ImgˆÖŽq;
var @@_ImgŠG‰æ;

var @@_GuitarOn = false;
var @@_ˆÖŽqOn = false;
var @@_ŠG‰æOn = false;

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

function @@_Shown(coName) {
	@@_LoadImage("@(GLOBAL)_@@_•”‰®.png",		function(img) { @@_Img•”‰® = img; });
	@@_LoadImage("@(GLOBAL)_@@_Guitar.png",		function(img) { @@_ImgGuitar = img; });
	@@_LoadImage("@(GLOBAL)_@@_ˆÖŽq.png",		function(img) { @@_ImgˆÖŽq = img; });
	@@_LoadImage("@(GLOBAL)_@@_ŠG‰æ.png",		function(img) { @@_ImgŠG‰æ = img; });

	Component_Button_SetText(coName + "_Guitar", "Guitar");
	Component_Button_SetText(coName + "_ˆÖŽq", "ˆÖŽq");
	Component_Button_SetText(coName + "_ŠG‰æ", "ŠG‰æ");

	Component_Button_SetAction(coName + "_Guitar", function() {
		@@_GuitarOn = !@@_GuitarOn;
		Riot_Refresh_Fire();
	});
	Component_Button_SetAction(coName + "_ˆÖŽq", function() {
		@@_ˆÖŽqOn = !@@_ˆÖŽqOn;
		Riot_Refresh_Fire();
	});
	Component_Button_SetAction(coName + "_ŠG‰æ", function() {
		@@_ŠG‰æOn = !@@_ŠG‰æOn;
		Riot_Refresh_Fire();
	});

	Riot_Refresh_Fire();
}

function @@_Refresh(coName) {
	var canvas = Riot_Get(coName + "_Canvas");
	var context = canvas.getContext("2d");

	context.drawImage(@@_Img•”‰®, 0, 0);

	if(@@_GuitarOn) {
		context.drawImage(@@_ImgGuitar, 500, 450);
	}
	if(@@_ˆÖŽqOn) {
		context.drawImage(@@_ImgˆÖŽq, 200, 350);
	}
	if(@@_ŠG‰æOn) {
		context.drawImage(@@_ImgŠG‰æ, 450, 200);
	}
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
