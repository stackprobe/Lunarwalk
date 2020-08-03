// �D�揇�ʏ� {
var @@_QueueEarly = []; // ���̂Ƃ��� _CreateElement() �p
var @@_Queue = [];
var @@_QueueLater = []; // ���̂Ƃ��� *_Shown() �� _Shown()���� �p
var @@_Hashed = new Map();
var @@_HashedLater = new Map(); // ���̂Ƃ��� _SetUI �p
// }

function @@_Early(routine) {
	@@_QueueEarly.unshift(routine); // todo
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

function @@_Run(hash) {
	@@_RunByHashed(hash, @@_Hashed);
}

function @@_RunLater(hash) {
	@@_RunByHashed(hash, @@_HashedLater);
}

function @@_RunUI(hash) {
	@@_RunLater("UI");
}

function @@_RunByHashed(hash, m) {
	if(m.has(hash)) {
		var routine = m.get(hash);

		m.delete(hash);

		routine();
	}
}

/*
	FreezeCount �� Chain �ɂ��Ⴆ�Ή�ʑJ�ڂ��܂ރC�x���g�������� @@_SetUI() �����ƁA��ʑJ�ڌ�ɖ����� "UI" �C�x���g����������Ă��܂���������Ȃ��B
	�K�X�A���֐����ĂԂ��ƁB���̕ӁA�l���s���B
*/
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
			for(var c = 1; ; c++) {
				if(c % 1000 == 0) {
					@(LOGPOS) // �����ʂ���������H
				}

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
