function @@_Loaded(coName) {
	Riot_Store.set(coName, {});
}

function @@_Shown(coName) {
	Riot_Refresh_Fire();
}

var @@_IMAGE_SRC = "@(GLOBAL)_@@_地図.png";

var @@_PointedX = -1;
var @@_PointedY;

var @@_MouseX = -1;
var @@_MouseY;

function @@_Refresh(coName) {
	var img;

	Riot_Event_Chain_Add(function(next) {
		img = new Image();
		img.onload = next;
		img.onerror = Riot_Panic;
		img.src = @@_IMAGE_SRC;
	});

	Riot_Event_Chain_Post(function() {
		var canvas = Riot_Get(coName + "_Canvas");
		var context = canvas.getContext("2d");

		context.drawImage(img, 0, 0);

		if(@@_PointedX != -1) {
			var x = @@_PointedX;
			var y = @@_PointedY;

			context.fillStyle = "rgb(0, 0, 255)";
			context.fillRect(x, 0, 1, @(@@_HEIGHT));
			context.fillRect(0, y, @(@@_WIDTH), 1);
		}

		if(@@_MouseX != -1) {
			var x = @@_MouseX;
			var y = @@_MouseY;

			context.fillStyle = "rgb(255, 0, 0)";
			context.fillRect(x, 0, 1, @(@@_HEIGHT));
			context.fillRect(0, y, @(@@_WIDTH), 1);
		}

		{
			var status = "カーソル位置 ⇒ " + (@@_MouseX == -1 ? "----" : @@_MouseX + ", " + @@_MouseY);

			if(@@_PointedX != -1) {
				status += " / クリックした位置 ⇒ " + @@_PointedX + ", " + @@_PointedY;
			}
			Riot_Get(coName + "_Status").innerText = status;
		}
	});
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

function @@_MouseMove(coName, e, tag) {
	@@_MouseX = e.offsetX;
	@@_MouseY = e.offsetY;

	Riot_Refresh_Fire();
}

function @@_MouseClick(coName, e, tag) {
	@@_PointedX = e.offsetX;
	@@_PointedY = e.offsetY;

	Riot_Refresh_Fire();
}

function @@_MouseLeave(coName, e, tag) {
	@@_MouseX = -1;

	Riot_Refresh_Fire();
}
