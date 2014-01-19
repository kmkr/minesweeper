window.mines.Minefield = (function () {
	var generateRows, placeMines;

	Minefield = function (numRows, numCols, numMines) {
		this.numRows = numRows;
		this.numCols = numCols;
		this.numMines = numMines;
	}

	Minefield.prototype.generateBoard = function () {
		var board = generateRows(this.numRows, this.numCols);
		placeMines(board, this.numMines);
		return board;
	}

	generateRows = function (numRows, numCols) {
		var board = new Array(numRows);
		_.times(numRows, function(i) {
			 var cols = new Array(numCols);
			board[i] = _.map(new Array(numCols), function (col) {
				return new mines.Field();
			});
		});
		return board;
	};

	placeMines = function (board, numMines) {
		_.times(numMines, function (i) {
			var row, col, placed = false;
			while (!placed) {
				row = _.random(0, board.length-1);
				col = _.random(0, board[row].length-1);
				if (!board[row][col].mine) {
					board[row][col].mine = true;
					placed = true;
				}
			}
		});
	};

	return Minefield;
})();