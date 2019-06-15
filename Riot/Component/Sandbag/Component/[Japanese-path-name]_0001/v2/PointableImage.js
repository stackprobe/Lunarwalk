function @@_Loaded(coName) {
	Riot_Store.set(coName, {});

	Riot_Event_Chain_Add(function(next) {
		@@_Image = new Image();
		@@_Image.onload = next;
		@@_Image.onerror = Riot_Panic;
		@@_Image.src = @@_IMAGE_SRC;
	});

	Riot_Event_Chain_Post(function() {
		@@_ImageLoaded = true;
		@@_�n�}�X�V(coName);
	});
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

var @@_IMAGE_SRC = "@(GLOBAL)_@@^^_PointableImage_�n�}.png";
var @@_Image;
var @@_ImageLoaded = false;

var @@_PointedX = -1;
var @@_PointedY;

var @@_MouseX = -1;
var @@_MouseY;

function @@_�n�}�X�V(coName) {
	if(@@_ImageLoaded) {
		var canvas = Riot_Get(coName + "_Canvas");
		var context = canvas.getContext("2d");

		context.drawImage(@@_Image, 0, 0);

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
			var status = "�J�[�\���ʒu �� " + (@@_MouseX == -1 ? "----" : @@_MouseX + ", " + @@_MouseY);

			if(@@_PointedX != -1) {
				status += " / �N���b�N�����ʒu �� " + @@_PointedX + ", " + @@_PointedY;
			}
			Riot_Get(coName + "_Status").innerText = status;
		}
	}
}

function @@_MouseMove(coName, e, tag) {
	@@_MouseX = e.offsetX;
	@@_MouseY = e.offsetY;

	@@_�n�}�X�V(coName);
}

function @@_MouseClick(coName, e, tag) {
	@@_PointedX = e.offsetX;
	@@_PointedY = e.offsetY;

	@@_�n�}�X�V(coName);
}

function @@_MouseLeave(coName, e, tag) {
	@@_MouseX = -1;

	@@_�n�}�X�V(coName);
}
