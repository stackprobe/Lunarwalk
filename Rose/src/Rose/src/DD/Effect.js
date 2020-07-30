var @@_EffectItes = [];

/*
使い方
	@@_Add(function*() {
		for(var i = 0; i < xxx; i++) {

			xxx(); // フレーム毎の処理

			if(i == xxx) {
				yield 0; // 偽を返すとエフェクトは終了する。
			}

			yield 1; // 真を返し続ける間エフェクトは維持される。
		}

		// ジェネレータを終了しても良い。エフェクトは終了する。
	});
*/

function @@_Add(effect) {
	var effectIte = effect();

	@@_EffectItes.push(effectIte);
}

function @@_EachFrame() {
	for(var i = 0; i < @@_EffectItes.length; i++) {
		if(!@@_EffectItes[i].next().value) { // ジェネレータが終了した場合 .next().value は undefined (false) になる。
			Rose_FastDesertElement(@@_EffectItes, i);
			i--;
		}
	}
}
