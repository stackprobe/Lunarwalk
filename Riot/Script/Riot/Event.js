// óDêÊèáà èá {
var @@_QueueEarly = []; // ç°ÇÃÇ∆Ç±ÇÎ _CreateElement() óp
var @@_Queue = [];
var @@_QueueLater = []; // ç°ÇÃÇ∆Ç±ÇÎ *_Shown() Ç© _Shown()ì‡ïî óp
var @@_Hashed = new Map();
var @@_HashedLater = new Map(); // ç°ÇÃÇ∆Ç±ÇÎ _SetUI óp
// }

function @@_Early(routine) {
	@@_QueueEarly.unshift(routine); // XXX
}

function @@_Add(routine) {
	@@_Queue.push(routine);
}

function @@_Later(routine) {
	@@_QueueLater.push(routine);
}

function @@_Set(hash, routine) {
	@@_Hashed.set(hash, routine);
}

function @@_SetLater(hash, routine) {
	@@_HashedLater.set(hash, routine);
}

function @@_SetUI(routine) {
	@@_SetLater("UI", routine);
}

function @@_ClearUI() {
	@@_SetUI(function() { });
}

var @@_FreezeCount = 0;

function @@_Freeze(count) {
	@@_FreezeCount = count;
}

var @@_MainTimer;

window.onload = function() {
	@@_MainTimer = setInterval(function() {
		try {
			for(var c = 0; c < 1000; c++) {
if(c == 900) @(LOGPOS) // test
				if(1 <= @@_FreezeCount) {
					@@_FreezeCount--;
					break;
				}

				if(@@_Chain_IsBusy()) {
					break;
				}

				var routine;

				if(1 <= @@_QueueEarly.length) {
					routine = @@_QueueEarly.shift();
				}
				else if(1 <= @@_Queue.length) {
					routine = @@_Queue.shift();
				}
				else if(1 <= @@_QueueLater.length) {
					routine = @@_QueueLater.shift();
				}
				else {
					var hashes = Riot_GetMapKeys(@@_Hashed);

					if(1 <= hashes.length) {
						routine = @@_Hashed.get(hashes[0]);

						@@_Hashed.delete(hashes[0]);
					}
					else {
						hashes = Riot_GetMapKeys(@@_HashedLater);

						if(hashes.length == 0) {
							break;
						}
						routine = @@_HashedLater.get(hashes[0]);

						@@_HashedLater.delete(hashes[0]);
					}
				}

				routine();
			}
		}
		catch(e) {
			console.log(e);

			clearInterval(@@_MainTimer);
		}
	},
	100
	);

	riot_main();
}

var riot_main = function() {
	riot_startup();
}
