export class Game {
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
		this.state = Game.State.X_TURN; 
		this.board = Array(9).fill(Game.Mark.NONE);
	}

	pressedButtonAtIndex(buttonIndex) {
		if (this.getMarkAtIndex(buttonIndex) != Game.Mark.NONE) {
			return;  // This spot is NOT open!!!!
		}
		if (this.state == Game.State.X_TURN) {
			this.board[buttonIndex] = Game.Mark.X;
			this.state = Game.State.O_TURN;
			this._checkForWin();
		} else if (this.state == Game.State.O_TURN) {
			this.board[buttonIndex] = Game.Mark.O;
			this.state = Game.State.X_TURN;
			this._checkForWin();
		}
	}

	_checkForWin() {
		// Put the tie code BEFORE the win code
		if (!this.board.includes(Game.Mark.NONE)) {
			this.state = Game.State.TIE;
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
				this.state = Game.State.X_WON;
			} else if (lineOf3 == "OOO") {
				this.state = Game.State.O_WON;
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
}