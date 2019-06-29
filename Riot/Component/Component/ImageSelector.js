function @@_Loaded(coName) {
	Riot_Store.set(coName, {
		Image: "",
		ImageMemory: null,
		EvLeave: Riot_Unq(),
	});
}

function @@_Shown(coName) {
	Riot_Get(coName + "_InputFileLabel")	.setAttribute("for", coName + "_InputFile");
	Riot_Get(coName + "_ClearButtonLabel")	.setAttribute("for", coName + "_ClearButton");
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	var store = Riot_Store.get(coName);

	Riot_Event_Set(store.EvLeave, function() {});

	Riot_Store.delete(coName);
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Box");
}

function @@_Append(coName, tag) {
	Riot_Never();
}

function @@_Changed(coName) {
	var store = Riot_Store.get(coName);

	store.ImageMemory = null;

	if(store.Image == "") {
		var tag = Riot_Get(coName + "_SelectedImage");

		tag.src          = "@(GLOBAL)_@@_NoImage.png";
		tag.style.left   = "0px";
		tag.style.top    = "0px";
		tag.style.width  = @(@@_IMAGE_AREA_W) + "px";
		tag.style.height = @(@@_IMAGE_AREA_H) + "px";
	}
	else {
		var img;
		var erred = false;

		Riot_Event_Chain_Add(function(next) {
			img = new Image();

			img.onload = function(e) {
				next();
			};

			img.onerror = function(e) {
				@(LOGPOS)
				erred = true;
				next();
			}

			img.src = store.Image;
		});

		Riot_Event_Chain_Post(function() {
			if(erred) {
				var tag = Riot_Get(coName + "_SelectedImage");

				tag.src          = "@(GLOBAL)_@@_NotAnImage.png";
				tag.style.left   = "0px";
				tag.style.top    = "0px";
				tag.style.width  = @(@@_IMAGE_AREA_W) + "px";
				tag.style.height = @(@@_IMAGE_AREA_H) + "px";
			}
			else {
				var w = img.naturalWidth;
				var h = img.naturalHeight;

				{
					var ww = @(@@_IMAGE_AREA_W);
					var hh = h * @(@@_IMAGE_AREA_W) / w;

					if(@(@@_IMAGE_AREA_H) < hh) {
						ww = w * @(@@_IMAGE_AREA_H) / h;
						hh = @(@@_IMAGE_AREA_H);
					}

					w = Math.round(ww);
					h = Math.round(hh);
				}

				var l = Math.floor((@(@@_IMAGE_AREA_W) - w) / 2);
				var t = Math.floor((@(@@_IMAGE_AREA_H) - h) / 2);

				{
					var tag = Riot_Get(coName + "_SelectedImage");

					tag.src          = store.Image;
					tag.style.left   = l + "px";
					tag.style.top    = t + "px";
					tag.style.width  = w + "px";
					tag.style.height = h + "px";
				}
			}
		});
	}
}

function @@_PutFiles(coName, files) {
	var store = Riot_Store.get(coName);

	if(files.length == 0) {
		store.Image = "";

		@@_Changed(coName);
	}
	else {
		var file = files[0];
		var ev;

		Riot_Event_Chain_Add(function(next) {
			var reader = new FileReader();

			reader.onload = function(e) {
				ev = e;
				next();
			};

			reader.onerror = function(e) {
				@(LOGPOS)
				ev = null;
				next();
			}

			reader.readAsDataURL(file);
		});

		Riot_Event_Chain_Post(function() {
			var image = ev == null ? "" : ev.target.result;

			store.Image = image;

			@@_Changed(coName);
		});
	}
}

function @@_ImageOnDrop(coName, event) {
	event.stopPropagation();
	event.preventDefault();

	var files = event.dataTransfer.files;

	@@_PutFiles(coName, files);
}

function @@_ImageOnEnter(coName, event) {
	var store = Riot_Store.get(coName);

	event.stopPropagation();
	event.preventDefault();

	if(store.ImageMemory == null) {
		var tag = Riot_Get(coName + "_SelectedImage");

		store.ImageMemory = {
			src:    tag.src,
			left:   tag.style.left,
			top:    tag.style.top,
			width:  tag.style.width,
			height: tag.style.height,
		};

		tag.src          = "@(GLOBAL)_@@_DragItHere.png";
		tag.style.left   = "0px";
		tag.style.top    = "0px";
		tag.style.width  = @(@@_IMAGE_AREA_W) + "px";
		tag.style.height = @(@@_IMAGE_AREA_H) + "px";
	}

	Riot_Event_Set(store.EvLeave, function() {});
}

function @@_ImageOnLeave(coName, event) {
	var store = Riot_Store.get(coName);

	Riot_Event_Freeze(1);
	Riot_Event_Set(store.EvLeave, function() { @@_DragLeaveDelay(coName); });
}

function @@_DragLeaveDelay(coName) {
	var store = Riot_Store.get(coName);

	if(store.ImageMemory != null) {
		var tag = Riot_Get(coName + "_SelectedImage");

		tag.src          = store.ImageMemory.src;
		tag.style.left   = store.ImageMemory.left;
		tag.style.top    = store.ImageMemory.top;
		tag.style.width  = store.ImageMemory.width;
		tag.style.height = store.ImageMemory.height;

		store.ImageMemory = null;
	}
}

function @@_FileSelected(coName) {
	var files = Riot_Get(coName + "_InputFile").files;

	@@_PutFiles(coName, files);

	Riot_Get(coName + "_InputFile").value = "";
}

function @@_GetImage(coName) { // ret: DataURL, "" == –¢‘I‘ð
	var store = Riot_Store.get(coName);

	return store.Image;
}

function @@_SetImage(coName, image) { // image: DateURL, "" == –¢‘I‘ð
	var store = Riot_Store.get(coName);

	store.Image = image;

	@@_Changed(coName);
}
