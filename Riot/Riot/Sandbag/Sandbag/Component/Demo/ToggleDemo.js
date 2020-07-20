function @@_Loaded(coName) {
	Riot_Store.set(coName, {});
}

function @@_Shown(coName) {
	var questionTds = @@_GetElements(coName + "_QuestionTd");
	var answerTds = @@_GetElements(coName + "_AnswerTd");
	var answers = @@_GetElements(coName + "_Answer");

	for(var i = 0; i < answers.length; i++) {
		var f = function() {
			var questionTd = questionTds[i];
			var answerTd = answerTds[i];
			var answer = answers[i];

			Component_Toggle_ƒNƒŠƒbƒN–³Œø‰»(answer);

			Riot_Get(answerTd).onclick = function() {
				Component_Toggle_Change(answer);
			};

			Component_Toggle_AddChanged(answer, function() {
				var value = Component_Toggle_GetValue(answer);
				var color;

				if(value) {
					color = "#88c";
				}
				else {
					color = "#c88";
				}

				Riot_Get(questionTd).style.backgroundColor = color;
				Riot_Get(answerTd).style.backgroundColor = color;

				if(value) {
					color = "#eff";
				}
				else {
					color = "#fee";
				}

				Riot_Get(questionTd).style.color = color;
				Riot_Get(answerTd).style.color = color;
			});
		};

		f();
	}
}

function @@_Refresh(coName) {
	// noop
}

function @@_Destroy(coName) {
	Riot_Store.delete(coName);
}

function @@_GetRoot(coName) {
	return Riot_Get(coName + "_Box");
}

function @@_Append(coName, tag) {
	Riot_Never();
}
