var @@_EffectItes = [];

function @@_Add(effect) {
	var effectIte = effect();

	@@_EffectItes.push(effectIte);
}

function @@_EachFrame() {
	for(var i = 0; i < @@_EffectItes.length; i++) {
		if(!@@_EffectItes[i].next().value) {
			Rose_FastDesertElement(@@_EffectItes, i);
			i--;
		}
	}
}
