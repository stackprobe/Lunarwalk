function @@_Loaded(coName) {
	Riot_Store.set(coName, {});
}

var @@_Img����;
var @@_ImgGuitar;
var @@_Img�֎q;
var @@_Img�G��;

var @@_GuitarOn = false;
var @@_�֎qOn = false;
var @@_�G��On = false;

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
	@@_LoadImage("@(GLOBAL)_@@_����.png",		function(img) { @@_Img���� = img; });
	@@_LoadImage("@(GLOBAL)_@@_Guitar.png",		function(img) { @@_ImgGuitar = img; });
	@@_LoadImage("@(GLOBAL)_@@_�֎q.png",		function(img) { @@_Img�֎q = img; });
	@@_LoadImage("@(GLOBAL)_@@_�G��.png",		function(img) { @@_Img�G�� = img; });

	Component_Button_SetText(coName + "_Guitar", "Guitar");
	Component_Button_SetText(coName + "_�֎q", "�֎q");
	Component_Button_SetText(coName + "_�G��", "�G��");

	Component_Button_SetAction(coName + "_Guitar", function() {
		@@_GuitarOn = !@@_GuitarOn;
		Riot_Refresh_Fire();
	});
	Component_Button_SetAction(coName + "_�֎q", function() {
		@@_�֎qOn = !@@_�֎qOn;
		Riot_Refresh_Fire();
	});
	Component_Button_SetAction(coName + "_�G��", function() {
		@@_�G��On = !@@_�G��On;
		Riot_Refresh_Fire();
	});

	Riot_Refresh_Fire();
}

function @@_Refresh(coName) {
	var canvas = Riot_Get(coName + "_Canvas");
	var context = canvas.getContext("2d");

	context.drawImage(@@_Img����, 0, 0);

	if(@@_GuitarOn) {
		context.drawImage(@@_ImgGuitar, 500, 450);
	}
	if(@@_�֎qOn) {
		context.drawImage(@@_Img�֎q, 200, 350);
	}
	if(@@_�G��On) {
		context.drawImage(@@_Img�G��, 450, 200);
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
