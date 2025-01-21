var rhit = rhit || {};


rhit.PageController = class {
	constructor() {
		console.log("Made a PageController");
		this.game = new rhit.Game();

	}

	updateView() {

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

	}

	// Optionals:
	getMarkAtIndex(buttonIndex) {
		return "X";  // TODO: Use the enum
	}
};


rhit.main = function () {
	console.log("Ready");
	new rhit.PageController(); 
};

rhit.main();
