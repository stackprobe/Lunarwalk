var @@_�j��List = [
!import SJIS Parser\�j��\dest\�j��.js.txt
];

var @@_�j��Map = null;

function @@_Get�j��Map() {
	if(@@_�j��Map == null) {
		@@_�j��Map = new Map();

		for(var i = 0; i < @@_�j��List.length; i++) {
			@@_�j��Map.set(@@_�j��List[i][0], @@_�j��List[i][1]);
		}
	}
	return @@_�j��Map;
}

function @@_Is�j��(date) { // date: YYYYMMDD
	return @@_Get�j��Map().has(date);
}
