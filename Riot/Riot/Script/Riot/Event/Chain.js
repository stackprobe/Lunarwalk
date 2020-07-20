var @@_Queue = [];

function @@_IsBusy() {
	return 1 <= @@_Queue.length;
}

function @@_Next() {
	if(1 <= @@_Queue.length) {
		@@_Queue.shift()(@@_Next);
	}
}

function @@_Add(routine) {
	@@_Queue.push(routine);
	@@_Queue.push(function(next) { next(); });

	if(@@_Queue.length == 2) {
		@@_Next();
	}
}

function @@_Post(routine) {
	@@_Add(function(next) {
		routine();
		next();
	});
}
