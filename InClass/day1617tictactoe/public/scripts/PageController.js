import { Game } from "./Game.js";

export class PageController {
	constructor() {
		this.game = new Game();
		document.querySelector("#newGameButton").addEventListener("click", () => {
			this.game = new Game();
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
}
