function @@_Loaded(coName) {
	var info = {};

	info.XMin = 1;
	info.XStep = 1;
	info.XCount = 12;
	info.XSuffix = "月";

	info.YMin = 0;
	info.YMax = 100;
	info.YDivCount = 10;
	info.YSuffix = "%";

	info.W = 600;
	info.H = 400;

	info.Margin = {}; // グラフ描画領域に対するマージン
	info.Margin.L = 45;
	info.Margin.T = 15;
	info.Margin.R = 15;
	info.Margin.B = 45;

	var store = {};

	store.Info = info;
	store.Yss = [];
	store.LineColors = [];

	Riot_Store.set(coName, store);
}

function @@_Shown(coName) {
	// noop
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

function @@_GetInfo(coName) {
	return Riot_Store.get(coName).Info;
}

function @@_AddLine(coName, ys, color) {
	var store = Riot_Store.get(coName);

	store.Yss.push(ys);
	store.LineColors.push(color);
}

var @@_NS_URL = "http://www.w3.org/2000/svg";

function @@_Draw(coName) {
	var store = Riot_Store.get(coName);

	var svg = document.createElementNS(@@_NS_URL, "svg");

	svg.setAttribute("width", store.Info.W);
	svg.setAttribute("height", store.Info.H);
	svg.setAttribute("viewBox", "0 0 " + store.Info.W + " " + store.Info.H);

	{
		var rect = document.createElementNS(@@_NS_URL, "rect");

		rect.setAttribute("x", 0);
		rect.setAttribute("y", 0);
		rect.setAttribute("width", store.Info.W);
		rect.setAttribute("height", store.Info.H);
		rect.setAttribute("fill", "#eee");

		svg.appendChild(rect);
	}

	for(var yi = 0; yi <= store.Info.YDivCount; yi++) {
		var y = store.Info.H - store.Info.Margin.B - Math.floor((store.Info.H - store.Info.Margin.T - store.Info.Margin.B) * (yi / store.Info.YDivCount));

		{
			var rect = document.createElementNS(@@_NS_URL, "rect");

			rect.setAttribute("x", store.Info.Margin.L);
			rect.setAttribute("y", y);
			rect.setAttribute("width", store.Info.W - store.Info.Margin.L - store.Info.Margin.R);
			rect.setAttribute("height", 1);
			rect.setAttribute("fill", "#aaa");

			svg.appendChild(rect);
		}

		{
			var text = document.createElementNS(@@_NS_URL, "text");

			text.setAttribute("x", store.Info.Margin.L - 5);
			text.setAttribute("y", y + 4);
			text.setAttribute("text-anchor", "end");
			text.setAttribute("style", "font-size: 10px; color: #aaa;");
			text.textContent = (store.Info.YMin + (store.Info.YMax - store.Info.YMin) * (yi / store.Info.YDivCount)) + store.Info.YSuffix;

			svg.appendChild(text);
		}
	}

	for(var xi = 0; xi < store.Info.XCount; xi++) {
		var x = store.Info.Margin.L + Math.floor((store.Info.W - store.Info.Margin.L - store.Info.Margin.R) * (xi / (store.Info.XCount - 1)));

		{
			var text = document.createElementNS(@@_NS_URL, "text");

			text.setAttribute("x", x);
			text.setAttribute("y", store.Info.H - store.Info.Margin.B + 20);
			text.setAttribute("text-anchor", "middle");
			text.setAttribute("style", "font-size: 10px; color: #aaa;");
			text.textContent = (store.Info.XMin + xi * store.Info.XStep) + store.Info.XSuffix;

			svg.appendChild(text);
		}
	}

	for(var i = 0; i < store.Yss.length; i++) {
		var ys = store.Yss[i];

		for(xi = 1; xi < ys.length; xi++) {
			var x1 = store.Info.Margin.L + Math.floor((store.Info.W - store.Info.Margin.L - store.Info.Margin.R) * ((xi - 1) / (store.Info.XCount - 1)));
			var x2 = store.Info.Margin.L + Math.floor((store.Info.W - store.Info.Margin.L - store.Info.Margin.R) * ((xi - 0) / (store.Info.XCount - 1)));
			var y1 = store.Info.H - store.Info.Margin.B - Math.floor((store.Info.H - store.Info.Margin.T - store.Info.Margin.B) * ((ys[xi - 1] - store.Info.YMin) / (store.Info.YMax - store.Info.YMin)));
			var y2 = store.Info.H - store.Info.Margin.B - Math.floor((store.Info.H - store.Info.Margin.T - store.Info.Margin.B) * ((ys[xi - 0] - store.Info.YMin) / (store.Info.YMax - store.Info.YMin)));

			{
				var line = document.createElementNS(@@_NS_URL, "line");

				line.setAttribute("x1", x1);
				line.setAttribute("y1", y1);
				line.setAttribute("x2", x2);
				line.setAttribute("y2", y2);
				line.setAttribute("stroke", store.LineColors[i]);
				line.setAttribute("stroke-width", 2);
				line.setAttribute("stroke-linecap", "round");

				svg.appendChild(line);
			}
		}
	}

	Riot_Get(coName + "_Box").style.width  = store.Info.W + "px";
	Riot_Get(coName + "_Box").style.height = store.Info.H + "px";

	Riot_Set(coName + "_Box", svg);
}
