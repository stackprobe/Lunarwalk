var @@_EffectItes = [];

/*
�g����
	@@_Add(function*() {
		for(var i = 0; i < xxx; i++) {

			xxx(); // �t���[�����̏���

			if(i == xxx) {
				yield 0; // �U��Ԃ��ƃG�t�F�N�g�͏I������B
			}

			yield 1; // �^��Ԃ�������ԃG�t�F�N�g�͈ێ������B
		}

		// �W�F�l���[�^���I�����Ă��ǂ��B�G�t�F�N�g�͏I������B
	});
*/

function @@_Add(effect) {
	var effectIte = effect();

	@@_EffectItes.push(effectIte);
}

function @@_EachFrame() {
	for(var i = 0; i < @@_EffectItes.length; i++) {
		if(!@@_EffectItes[i].next().value) { // �W�F�l���[�^���I�������ꍇ .next().value �� undefined (false) �ɂȂ�B
			Rose_FastDesertElement(@@_EffectItes, i);
			i--;
		}
	}
}
