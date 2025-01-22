var rhit = rhit || {};

rhit.PageController = class {
	constructor() {
		this.game = new rhit.Game();
		document.querySelector("#newGameButton").addEventListener("click", () => {
			this.game = new rhit.Game();
			this.updateView();
		});
		document.querySelectorAll(".square").forEach((element) => {
			element.addEventListener("click", () => {
				let buttonIndex = parseInt(element.dataset.buttonIndex);
				this.game.pressedButtonAtIndex(buttonIndex);
				this.updateView();
			});
		});
		this.updateView();  // Calls update View at the start.
	}

	updateView() {
		document.querySelector("#gameStateText").textContent = this.game.state;
		document.querySelectorAll(".square").forEach((element, index) => {
			element.textContent = this.game.getMarkAtIndex(index);
		});
	}
};

rhit.Game = class {
	static Mark = {
		X: "X",
		O: "O",
		NONE: " "
	}
	static State = {
		X_TURN: "X's Turn",
		O_TURN: "O's Turn",
		X_WON: "X Wins!",
		O_WON: "O Wins!",
		TIE: "Tie Game"
	}


	constructor() {
		this.state = rhit.Game.State.X_TURN; 
		this.board = Array(9).fill(rhit.Game.Mark.NONE);
	}

	pressedButtonAtIndex(buttonIndex) {
		if (this.getMarkAtIndex(buttonIndex) != rhit.Game.Mark.NONE) {
			return;  // This spot is NOT open!!!!
		}
		if (this.state == rhit.Game.State.X_TURN) {
			this.board[buttonIndex] = rhit.Game.Mark.X;
			this.state = rhit.Game.State.O_TURN;
			this._checkForWin();
		} else if (this.state == rhit.Game.State.O_TURN) {
			this.board[buttonIndex] = rhit.Game.Mark.O;
			this.state = rhit.Game.State.X_TURN;
			this._checkForWin();
		}
	}

	_checkForWin() {
		// Put the tie code BEFORE the win code
		if (!this.board.includes(rhit.Game.Mark.NONE)) {
			this.state = rhit.Game.State.TIE;
		}

		let linesOf3 = [];
		linesOf3.push(this.board[0] + this.board[1] + this.board[2]);
		linesOf3.push(this.board[3] + this.board[4] + this.board[5]);
		linesOf3.push(this.board[6] + this.board[7] + this.board[8]);

		linesOf3.push(this.board[0] + this.board[3] + this.board[6]);
		linesOf3.push(this.board[1] + this.board[4] + this.board[7]);
		linesOf3.push(this.board[2] + this.board[5] + this.board[8]);

		linesOf3.push(this.board[0] + this.board[4] + this.board[8]);
		linesOf3.push(this.board[6] + this.board[4] + this.board[2]);

		for (let lineOf3 of linesOf3) {
			if (lineOf3 == "XXX") {
				this.state = rhit.Game.State.X_WON;
			} else if (lineOf3 == "OOO") {
				this.state = rhit.Game.State.O_WON;
			}
		}
	}

	// Optionals:
	getMarkAtIndex(buttonIndex) {
		return this.board[buttonIndex];
	}

	toString() {
		return `State ${this.state}  Board: ${this.board}`;
	}
};


rhit.main = function () {
	console.log("Ready");
	new rhit.PageController(); 

	// Temp example
	// let game = new rhit.Game();
	// console.log(game.toString());
	// game.pressedButtonAtIndex(4);
	// console.log(game.toString());
};

rhit.main();
