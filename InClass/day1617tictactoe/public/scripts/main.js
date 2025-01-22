var rhit = rhit || {};

rhit.PageController = class {
	constructor() {
		console.log("Made a PageController");
		this.game = new rhit.Game();
		// TODO: Setup the NEW GAME and .square listeners

		document.querySelector("#newGameButton").addEventListener("click", () => {
			console.log("Clicked New Game");
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
		console.log("Made a Game");
		this.state = rhit.Game.State.X_TURN; 
		// this.board = [];  // Of enums
		// for (let k = 0; k < 9; k++) {
		// 	this.board.push(rhit.Game.Mark.NONE);
		// }
		// Chat's solution:
		this.board = Array(9).fill(rhit.Game.Mark.NONE);


	}

	pressedButtonAtIndex(buttonIndex) {
		this.board[buttonIndex] = rhit.Game.Mark.X;
		this.state = rhit.Game.State.O_TURN;
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
