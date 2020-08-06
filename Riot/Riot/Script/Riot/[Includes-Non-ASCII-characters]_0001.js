var @@_j“úList = [
!import SJIS Parser\j“ú\dest\j“ú.js.txt
];

var @@_j“úMap = null;

function @@_Getj“úMap() {
	if(@@_j“úMap == null) {
		@@_j“úMap = new Map();

		for(var i = 0; i < @@_j“úList.length; i++) {
			@@_j“úMap.set(@@_j“úList[i][0], @@_j“úList[i][1]);
		}
	}
	return @@_j“úMap;
}

function @@_Isj“ú(date) { // date: YYYYMMDD
	return @@_Getj“úMap().has(date);
}
