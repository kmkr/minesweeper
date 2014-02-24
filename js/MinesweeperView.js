window.mines.Minesweeper = (function () {
	Minesweeper = function (opts) {
		this.el = document.createElement("div");
		this.options = _.extend({
			numRows: 5,
			numCols: 5,
			numMines: 5
		}, opts);

		this.board = new mines.models.Minefield(this.options.numRows, this.options.numCols, this.options.numMines).generateBoard();
		_.bindAll(this);
	}

	Minesweeper.prototype.adjacentTo = function (rowIndex, colIndex) {
		var res = [];
		var self = this;
		var pushIfField = function (rowIndex, colIndex) {
			var field;
			if (field = self.field(rowIndex, colIndex)) {
				res.push({rowIndex: rowIndex, colIndex: colIndex, field: field});
			}
		}
		pushIfField(rowIndex-1, colIndex-1);
		pushIfField(rowIndex-1, colIndex);
		pushIfField(rowIndex-1, colIndex+1);
		pushIfField(rowIndex, colIndex-1);
		pushIfField(rowIndex, colIndex+1);
		pushIfField(rowIndex+1, colIndex-1);
		pushIfField(rowIndex+1, colIndex);
		pushIfField(rowIndex+1, colIndex+1);
		return res;
	};

	Minesweeper.prototype.field = function (rowIndex, colIndex) {
		if (rowIndex >= 0 && colIndex >= 0 && this.board[rowIndex] && this.board[rowIndex][colIndex]) {
			return this.board[rowIndex][colIndex];
		}
	};

	Minesweeper.prototype.numAdjacentMines = function (rowIndex, colIndex) {
		return _.reduce(this.adjacentTo(rowIndex, colIndex), function (sum, adjacent) {
			return sum + (adjacent.field.mine ? 1 : 0);
		}, 0);
	};

	Minesweeper.prototype.reveal = function (rowIndex, colIndex) {
		var field = this.field(rowIndex, colIndex);
		var wasRevealed = field.revealed;
		field.revealed = true;
		if (field.mine) {
			this.gameover = true;
		}
		if (field && !wasRevealed && this.numAdjacentMines(rowIndex, colIndex) === 0) {
			_.each(this.adjacentTo(rowIndex, colIndex), function (adjacent) {
				this.reveal(adjacent.rowIndex, adjacent.colIndex);
			}, this);
		}
	};

	Minesweeper.prototype.generateTableCell = function (rowIndex, colIndex) {
		var td = document.createElement("td");
		var field = this.field(rowIndex, colIndex);
		var self = this;
		td.addEventListener("click", function () {
			self.reveal(rowIndex, colIndex);
			self.render();
		});
		td.addEventListener("contextmenu", function (e) {
			td.className = td.className == "" ? "flagged" : "";
			e.preventDefault();
		});
		if (field.revealed || this.gameover) {
			if (field.mine) {
				td.innerHTML = "*";
			} else {
				td.innerHTML = this.numAdjacentMines(rowIndex, colIndex);
			}
		}	
		return td;
	}

	Minesweeper.prototype.generateTable = function () {
		var table = document.createElement("table");
		_.each(this.board, function (row, i) {
			var tr = document.createElement("tr");
			_.each(row, function (field, j) {
				tr.appendChild(this.generateTableCell(i, j))
			}, this);
			table.appendChild(tr);
		}, this);

		return table;
	};

	Minesweeper.prototype.render = function () {
		this.el.innerHTML = "";
		this.el.appendChild(this.generateTable());
		if (this.gameover) {
			this.el.setAttribute("class", "lost");
		}
		return this.el;
	};

	return Minesweeper;
})();