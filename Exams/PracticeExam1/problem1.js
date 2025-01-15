var rhit = rhit || {};

rhit.setupButtons = function() {
    console.log("Setup Buttons");
    document.querySelectorAll("[name='q1']").forEach( (element) => {
        element.addEventListener("change", (event) => {
            console.log(element.value);
            let q1correctElement = document.querySelector("#q1correct");
            let q1incorrectElement = document.querySelector("#q1incorrect");
            if (element.value == "correct") {
                q1correctElement.removeAttribute("hidden");
                q1incorrectElement.setAttribute("hidden", "");
            } else {
                q1correctElement.setAttribute("hidden", "");
                q1incorrectElement.removeAttribute("hidden");
            }
        });
    });


    document.querySelectorAll("[name='q2']").forEach( (element) => {
        element.addEventListener("change", (event) => {
            console.log(element.value);
            let q2correctElement = document.querySelector("#q2correct");
            let q2incorrectElement = document.querySelector("#q2incorrect");
            if (element.value == "correct") {
                q2correctElement.removeAttribute("hidden");
                q2incorrectElement.setAttribute("hidden", "");
            } else {
                q2correctElement.setAttribute("hidden", "");
                q2incorrectElement.removeAttribute("hidden");
            }
        });
    });
};

window.addEventListener("load", () => {
    console.log("Ready");
    rhit.setupButtons();
});