/**
 * @author 
 * David Fisher
 */

var rhit = rhit || {};
rhit.counter = 0;
rhit.colorText = "#800000";
rhit.colorClass = "red-box";
// rhit.colorText = "Hello Class";
// rhit.colorClass = "purple-box";

rhit.setupButtons = function () {
	console.log("Setup the buttons");
	document.querySelector("#decButton").onclick = () => {
		console.log("The pressed Decrement");
		rhit.counter -= 1;
		rhit.update();
	};
	document.querySelector("#resetButton").onclick = () => {
		console.log("The pressed Reset");
		rhit.counter = 0;
		rhit.update();
	};
	document.querySelector("#incButton").onclick = () => {
		console.log("The pressed Increment");
		rhit.counter += 1;
		rhit.update();
	};
	let allColorButtons = document.querySelectorAll(".color-button");
	for (let colorButton of allColorButtons) {
		colorButton.onclick = (event) => {
			console.log("You pressed some color", event.target);
			rhit.colorText = event.target.dataset.colorText;
			rhit.colorClass = event.target.dataset.colorClass;
			rhit.update();
		}
	}
};

rhit.update = function() {
	document.querySelector("#counterText").innerHTML = rhit.counter;

	document.querySelector("#favoriteColorBox").innerHTML = rhit.colorText;
	document.querySelector("#favoriteColorBox").classList = [rhit.colorClass];
};

rhit.main = function () {
	console.log("Ready");
	rhit.setupButtons();
	rhit.update();
};

rhit.main();
