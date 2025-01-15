var rhit = rhit || {};
rhit.counter = 0;
rhit.colorText = "#800000";
rhit.colorClass = "default-box";

rhit.setupButtonCallbacks = function () {
  document.querySelector("#incButton").onclick = () => {
    rhit.counter += 1;
	rhit.update();
  };
  document.querySelector("#resetButton").onclick = () => {
    rhit.counter = 0;
	rhit.update();
  };
  document.querySelector("#decButton").onclick = () => {
    rhit.counter -= 1;
	rhit.update();
  };
  let colorButtons = document.querySelectorAll(".color-btn");
  for (let colorButton of colorButtons) {
	colorButton.onclick = (event) => {
		rhit.colorText = event.target.dataset.colorText;
		rhit.colorClass = event.target.dataset.colorClass;
		rhit.update();
	  };

  }

};

rhit.update = function() {
	document.querySelector("#counterText").innerHTML = rhit.counter;
	
	let favoriteColorBox = document.querySelector("#favoriteColorBox");
	favoriteColorBox.innerHTML = rhit.colorText;
	favoriteColorBox.classList = [rhit.colorClass];
};

/* Main */
/** function and class syntax examples */
rhit.main = function () {
  console.log("Ready");
  rhit.setupButtonCallbacks();
};

rhit.main();
