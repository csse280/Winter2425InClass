/**
 * @author 
 * David Fisher
 */

var rhit = rhit || {};
rhit.counter = 0;

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
};

rhit.update = function() {
	document.querySelector("#counterText").innerHTML = rhit.counter;
};

rhit.main = function () {
	console.log("Ready");
	rhit.setupButtons();
};

rhit.main();
