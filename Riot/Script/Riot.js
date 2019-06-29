function @@_PostCreateElement(coName, tag, loaded, shown, refresh, destroy) {
	Riot_Refresh_RunSlim();

	var tagId = tag.id;

	Riot_Event_Add(function() {
		loaded(coName);

		Riot_Event_Later(function() {
			shown(coName);

			Riot_Refresh_Add(
				tagId,
				function() { refresh(coName); },
				function() { destroy(coName); }
				);
		});
	});
}

function @@_GetElements(coName, tagIDSuffixAddedIDSuffixPairs) {
	var dest = [];

	for(var i = 0; i < tagIDSuffixAddedIDSuffixPairs.length; i++) {
		var pair = tagIDSuffixAddedIDSuffixPairs[i];

		if(Riot_EndsWith(coName, pair[0])) {
			dest.push(coName + pair[1]);
		}
	}
	return dest;
}

var @@_Store = new Map();

function @@_Get(id) { // id: "BODY" == Body 要素
	var t;

	if(id == "BODY") {
		t = document.body;
	}
	else {
		t = document.getElementById(id);
	}

	if(t == null) {
		throw new Error("タグが見つかりません。" + id);
	}
	return t;
}

function @@_Remove(t) {
	t.parentNode.removeChild(t);

	Riot_Refresh_Slim();
}

function @@_Cleanup(t) {
	while(t.firstChild) {
		t.removeChild(t.firstChild);
	}
	Riot_Refresh_Slim();
}

function @@_Set(id, t) {
	@@_Cleanup(@@_Get(id));
	@@_Append(id, t);
}

var @@_FloatMode = 0;

function @@_Float() {
	@@_FloatMode = 1;
}

function @@_FloatRight() {
	@@_FloatMode = 2;
}

function @@_FloatEnd() {
	@@_FloatMode = 3;
}

function @@_Append(id, t) {
	Riot_Refresh_RunSlim();

	@@_Get(id).appendChild(t);

	if(@@_FloatMode == 0) {
		// noop
	}
	else if(@@_FloatMode == 1) {
		@@_SetFloat(t);
	}
	else if(@@_FloatMode == 2) {
		@@_SetFloatRight(t);
	}
	else if(@@_FloatMode == 3) {
		@@_SetFloatEnd(t);
		@@_FloatMode = 0;
	}
	else {
		Riot_Never();
	}
}

function @@_SetFloat(tag) {
	tag.style.float = "left";
}

function @@_SetFloatRight(tag) {
	tag.style.float = "right";
}

function @@_SetFloatEnd(tag) {
	tag.style.clear = "both";
}

var @@_UnqCount = 0;

function @@_Unq() {
	return "DyUnq" + ++@@_UnqCount + "D";
}

function @@_GetMapKeys(map) { // map: new Map()
	var keys = [];

	map.forEach(function(value, key, dmyMap) {
		keys.push(key);
	});

	@@_Sort(keys);

	return keys;
}

function @@_WB() {
	return Component_WhiteBox_CreateElement(@@_Unq());
}

function @@_WBW(w) {
	var cn = @@_Unq();

	Riot_Event_Add(function() {
		Component_WhiteBox_SetWidth(cn, w);
	});

	return Component_WhiteBox_CreateElement(cn);
}

function @@_WBH(h) {
	var cn = @@_Unq();

	Riot_Event_Add(function() {
		Component_WhiteBox_SetHeight(cn, h);
	});

	return Component_WhiteBox_CreateElement(cn);
}

function @@_WBWH(w, h) {
	var cn = @@_Unq();

	Riot_Event_Add(function() {
		Component_WhiteBox_SetWidth(cn, w);
		Component_WhiteBox_SetHeight(cn, h);
	});

	return Component_WhiteBox_CreateElement(cn);
}

function @@_Label(text) {
	var cn = @@_Unq();

	Riot_Event_Add(function() {
		Component_Label_SetText(cn, text);
	});

	return Component_Label_CreateElement(cn);
}

function @@_Never() {
	throw new Error("never");
}

function @@_Panic() {
	console.log("Panic!");
	console.trace();
}

var @@_BINADECIMAL = "01";
var @@_OCTODECIMAL = "01234567";
var @@_DECIMAL     = "0123456789";
var @@_HEXADECIMAL = "0123456789ABCDEF";
var @@_hexadecimal = "0123456789abcdef";

var @@_ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var @@_alpha = "abcdefghijklmnopqrstuvwxyz";
var @@_PUNCT = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var @@_ASCII = @@_DECIMAL + @@_ALPHA + @@_alpha + @@_PUNCT; // 制御コードと空白を含まない。
var @@_KANA = "｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ";
var @@_HALF = @@_ASCII + @@_KANA;

var @@_MBC_HIRA = "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん";
var @@_MBC_KANA = "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶー";

var @@_MBC_BINADECIMAL = "０１";
var @@_MBC_OCTODECIMAL = "０１２３４５６７";
var @@_MBC_DECIMAL     = "０１２３４５６７８９";
var @@_MBC_HEXADECIMAL = "０１２３４５６７８９ＡＢＣＤＥＦ";
var @@_MBC_hexadecimal = "０１２３４５６７８９ａｂｃｄｅｆ";

function @@_IndexOf(str, ptn) {
	return str.indexOf(ptn);
}

function @@_IndexOfIgnoreCase(str, ptn) {
	return @@_IndexOf(str.toLowerCase(), ptn.toLowerCase());
}

function @@_StartsWith(str, ptn) {
	return ptn.length <= str.length && str.substring(0, ptn.length) == ptn;
}

function @@_StartsWithIgnoreCase(str, ptn) {
	return @@_StartsWith(str.toLowerCase(), ptn.toLowerCase());
}

function @@_EndsWith(str, ptn) {
	return ptn.length <= str.length && str.substring(str.length - ptn.length) == ptn;
}

function @@_EndsWithIgnoreCase(str, ptn) {
	return @@_EndsWith(str.toLowerCase(), ptn.toLowerCase());
}

function @@_Contains(str, ptn) {
	return @@_IndexOf(str, ptn) != -1;
}

function @@_ContainsIgnoreCase(str, ptn) {
	return @@_IndexOfIgnoreCase(str, ptn) != -1;
}

function @@_IndexOfCharMatch(str, match) {
	for(var i = 0; i < str.length; i++) {
		if(match(str.substring(i, i + 1))) {
			return i;
		}
	}
	return -1;
}

function @@_IndexOfChar(str, chrs) {
	return @@_IndexOfCharMatch(str, function(chr) { return @@_Contains(chrs, chr); });
}

function @@_IndexOfDisallowChar(str, chrs) {
	return @@_IndexOfCharMatch(str, function(chr) { return @@_Contains(chrs, chr) == false; });
}

function @@_ContainsCharMatch(str, match) {
	return @@_IndexOfCharMatch(str, match) != -1;
}

function @@_ContainsChar(str, chrs) {
	return @@_IndexOfChar(str, chrs) != -1;
}

function @@_ContainsDisallowChar(str, chrs) {
	return @@_IndexOfDisallowChar(str, chrs) != -1;
}

function @@_LiteValidateMinMax(str, chrs, minlen, maxlen) {
	return minlen <= str.length && str.length <= maxlen && @@_ContainsDisallowChar(str, chrs);
}

function @@_LiteValidateMin(str, chrs, minlen) {
	return @@_LiteValidateMinMax(str, chrs, minlen, @(IMAX));
}

function @@_LiteValidate(str, chrs) {
	return @@_LiteValidateMin(str, chrs, 1);
}

function @@_LastIndexOf(str, ptn) {
	return str.lastIndexOf(ptn);
}

function @@_LastIndexOfIgnoreCase(str, ptn) {
	return @@_LastIndexOf(str.toLowerCase(), ptn.toLowerCase());
}

function @@_IndexOfFrom(str, ptn, start) {
	return str.indexOf(ptn, start);
}

function @@_Replace(str, rPtn, wPtn) {
	var i = 0;

	for(; ; ) {
		i = @@_IndexOfFrom(str, rPtn, i);

		if(i == -1) {
			break;
		}
		str = str.substring(0, i) + wPtn + str.substring(i + rPtn.length);
		i += wPtn.length;
	}
	return str;
}

function @@_ReplaceChars(str, rChrs, wPtn) {
	for(var i = 0; i < rChrs.length; i++) {
		str = @@_Replace(str, rChrs.substring(i, i + 1), wPtn);
	}
	return str;
}

function @@_ReplaceCharsPair(str, rChrs, wChrs) {
	for(var i = 0; i < rChrs.length; i++) {
		str = @@_Replace(str, rChrs.substring(i, i + 1), wChrs.substring(i, i + 1));
	}
	return str;
}

function @@_ZPad(value, minlen) {
	var str = "" + value;

	while(str.length < minlen) {
		str = "0" + str;
	}
	return str;
}

function @@_SetClassName(tag, name) {
	tag.className = "@(GLOBAL)_" + name;
}

function @@_AddClassName(tag, name) {
	tag.className += " @(GLOBAL)_" + name;
}

function @@_CoNameToCoNamePrefix(coName) { // 使わない気がする。
	return coName + "_";
}

function @@_CoNameToParent(coName) {
	var i = @@_LastIndexOf(coName, "_");

	if(i == -1) {
		return null;
	}
	return coName.substring(0, i);
}

function @@_CoNameToParentLoop(coName, count) {
	for(var i = 0; i < count; i++) {
		coName = @@_CoNameToParent(coName);
	}
	return coName;
}

function @@_Select(arr, conv) {
	var dest = [];

	for(var i = 0; i < arr.length; i++) {
		dest.push(conv(arr[i]));
	}
	return dest;
}

function @@_Where(arr, match) {
	var dest = [];

	for(var i = 0; i < arr.length; i++) {
		if(match(arr[i])) {
			dest.push(arr[i]);
		}
	}
	return dest;
}

function @@_Any(arr, match) {
	for(var i = 0; i < arr.length; i++) {
		if(match(arr[i])) {
			return true;
		}
	}
	return false;
}

function @@_Join(separator, lines) {
	return lines.join(separator);
}

function @@_Split(str, separator) {
	var dest = [];
	var i = 0;

	for(; ; ) {
		var j = @@_IndexOfFrom(str, separator, i);

		if(j == -1) {
			break;
		}
		dest.push(str.substring(i, j));
		i = j + separator.length;
	}
	dest.push(str.substring(i));
	return dest;
}

function @@_SortComp(arr, comp) {
	arr.sort(comp);
}

function @@_Comp(a, b) {
	if(a < b) {
		return 1;
	}
	if(a > b) {
		return -1;
	}
	return 0;
}

function @@_Sort(arr) {
	@@_SortComp(arr, @@_Comp);
}

function @@_SortIgnoreCase(lines, comp) {
	@@_SortComp(lines, function(a, b) {
		return @@_Comp(a.toLowerCase(), b.toLowerCase());
	});
}

function @@_GetAll(tag) {
	var dest = [ tag ];

	for(var i = 0; i < dest.length; i++) {
		for(var j = 0; j < dest[i].children.length; j++) {
			dest.push(dest[i].children[j]);
		}
	}
	return dest.slice(1);
}
