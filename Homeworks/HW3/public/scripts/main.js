// TODO: Use ES6 Classes with Modules!

// Temporary learning stuff...

console.log("Ready");

document.querySelector("#fakeWin").addEventListener("click", () => {

	// TODO: Actually determine if they made the leadderboard!

  console.log("TODO: Show the dialog!");
  $("#addNameDialog").modal("show");
});

document.querySelector("#addNameBtn").addEventListener("click", () => {
	document.querySelector("#addNameBtn").blur();
	let name = document.querySelector("#nameInput").value;
	console.log("Name: ", name);

	// TODO: Actually send the name to the server!

	$("#addNameDialog").modal("hide");
});