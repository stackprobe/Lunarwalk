function @@_IndexOf(arr, element) {
	return @@_IndexOfMatch(arr, function(v) { return v == element; });
}

function @@_IndexOfMatch(arr, match) {
	for(var i = 0; i < arr.length; i++) {
		if(match(arr[i])) {
			return i;
		}
	}
	return -1;
}

function @@_Contains(arr, element) {
	return @@_IndexOf(arr, element) != -1;
}

function @@_ContainsMatch(arr, match) {
	return @@_IndexOfMatch(arr, match) != -1;
}

function @@_RemoveRange(arr, index, count) {
	return arr.splice(index, count);
}

function @@_RemoveAt(arr, index) {
	return @@_RemoveRange(arr, index, 1)[0];
}

function @@_Remove(arr, element) {
	@@_RemoveMatch(arr, function(v) { return v == element; });
}

function @@_RemoveMatch(arr, match) {
	for(var i = 0; i < arr.length; i++) {
		if(match(arr[i])) {
			@@_RemoveAt(arr, i);
			i--;
		}
	}
}
