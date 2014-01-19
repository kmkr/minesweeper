(function () {
	var minesweeper = new mines.Minesweeper(10, 10, 5);
	document.getElementsByTagName("body")[0].appendChild(minesweeper.render());
})();