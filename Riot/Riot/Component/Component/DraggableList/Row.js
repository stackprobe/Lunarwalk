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
	return Riot_Get(coName + "_Row");
}

function @@_Append(coName, tag) {
	Riot_Append(coName + "_Row", tag);
}

function @@_SetWidth(coName, w) {
	var t = Riot_Get(coName + "_Row");
	t.style.width = w + "px";
}

/*
	このコンポーネントの配下に Component_TextBox が存在することを通知する。
*/
function @@_TellTextBox(coName, textBoxCoName) {
	@@^^_TextBox_AddFocusGot(textBoxCoName, function() {
		Riot_Get(coName + "_Row").draggable = false;
	});

	@@^^_TextBox_AddFocusLost(textBoxCoName, function() {
		Riot_Get(coName + "_Row").draggable = true;
	});
}

// TODO 他のコンポーネントについても通知が必要 TextArea, RichTextBox など

// private -->

var @@_EV_LEAVE = "@(_UNQ)";

var @@_FromTag = null;
var @@_ToTag = null;

function @@_DragEnd() {
	Riot_Event_Set(@@_EV_LEAVE, function() {});

	if(@@_FromTag != null) {
		Riot_SetClassName(@@_FromTag, "@@_Row");
		@@_FromTag = null;
	}
	if(@@_ToTag != null) {
		Riot_SetClassName(@@_ToTag, "@@_Row");
		@@_ToTag = null;
	}
}

function @@_Leave() {
	if(@@_ToTag != null) {
		Riot_SetClassName(@@_ToTag, "@@_Row");
		@@_ToTag = null;
	}
}

function @@_OnDragStart(coName, event, tag) {
	@@_DragEnd();

	@@_FromTag = tag;
	@@_ToTag = null;

	Riot_SetClassName(@@_FromTag, "@@_RowFrom");
}

function @@_OnDragEnd(coName, event, tag) {
	@@_DragEnd();
}

function @@_OnDrop(coName, event, tag) {
	event.preventDefault();

	if(@@_FromTag != null && @@_ToTag != null) {
		var f = @@_FromTag;
		var t = @@_ToTag;

		if(
			f.getBoundingClientRect().top < t.getBoundingClientRect().top ||
			(
				f.getBoundingClientRect().top == t.getBoundingClientRect().top &&
				f.getBoundingClientRect().left < t.getBoundingClientRect().left
			)
			) {
			f.parentNode.insertBefore(f, t.nextSibling);
		}
		else {
			f.parentNode.insertBefore(f, t);
		}
	}
	@@_DragEnd();
}

function @@_OnEnter(coName, event, tag) {
	if(@@_FromTag == null) {
		return;
	}
	Riot_Event_Set(@@_EV_LEAVE, function() {});

	event.preventDefault();

	if(@@_ToTag != tag) {
		@@_Leave();
	}
	if(@@_FromTag != tag && @@_FromTag.parentNode.id == tag.parentNode.id) { // 同じリスト内での移動であること。
		@@_ToTag = tag;
		Riot_SetClassName(@@_ToTag, "@@_RowTo");
	}
}

function @@_OnLeave(coName, event, tag) {
	Riot_Event_Freeze(1);
	Riot_Event_Set(@@_EV_LEAVE, @@_Leave);
}
