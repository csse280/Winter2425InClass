window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    setupButtonListeners();
    loadData();

});

function addItemToList(itemString, status) {
    let list1 = document.querySelector("#list1")
    let list2 = document.querySelector("#list2")
    let li = document.createElement("li");
    li.textContent = itemString;
    if (status == 0) {
        list1.append(li);
    } else {
        list2.append(li);
        li.style.textDecoration = "line-through"
    }

    // Add a mouseover event listener to change the style on hover
    li.addEventListener("mouseover", function () {
        this.style.backgroundColor = "red";
        this.style.color = "white";
    });

    // Add a mouseout event listener to revert the style when the mouse leaves
    li.addEventListener("mouseout", function () {
        this.style.backgroundColor = ""; // Reset to default
        this.style.color = ""; // Reset to default
    });


    li.addEventListener("click", function () {
        if (li.style.textDecoration == "line-through") {
            li.style.textDecoration = ""
            list1.appendChild(li);
        } else {
            li.style.textDecoration = "line-through"
            list2.appendChild(li);
        }
        // NEW: let's not save after every click just yet, so we can see the save and load work.
        // console.log("saving data from lists after adding")
        // saveData();

    });




}

function clearData() {
    let list1 = document.querySelector("#list1")
    let list2 = document.querySelector("#list2")
    while (list1.firstChild) {
        list1.removeChild(list1.firstChild);
    }
    while (list2.firstChild) {
        list2.removeChild(list2.firstChild);
    }
}

function getCurrentData() {
    currentData = {}
    document.querySelectorAll("#list1 li").forEach((li) => {
        let item = li.textContent;
        currentData[item] = 0
    });

    document.querySelectorAll("#list2 li").forEach((li) => {
        let item = li.textContent;
        currentData[item] = 1
    });
    return currentData;
}

// TODO 6: convert LOAD XHR to fetch
function loadData() {
    console.log("loadData")
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
        console.log("handling response: " + xhr.responseText)
        let serverData = JSON.parse(xhr.responseText)
        clearData()
        for (let key in serverData) {
            console.log(key)
            if (serverData[key] == 0) {
                addItemToList(key, 0)
            } else {
                addItemToList(key, 1)
            }
        }
    });
    xhr.open("GET", "/API/LOAD");
    xhr.send();
    console.log("AJAX REQUEST SENT");
}

// TODO 7: convert SAVE XHR to fetch
function saveData() {

    currentData = getCurrentData();
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
        console.log("handling response: ");
        console.log(xhr.responseText);
    });
    xhr.open("POST", "/API/SAVE");
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const urlEncodedData = new URLSearchParams(currentData).toString();
    console.log(urlEncodedData);
    xhr.send(urlEncodedData);
    console.log("AJAX REQUEST SENT");

}


function setupButtonListeners() {
    document.querySelector("#save").addEventListener("click", saveData);
    document.querySelector("#load").addEventListener("click", loadData);
    document.querySelector("#button1").addEventListener("click", () => {
        let textString = document.querySelector("#text1").value;
        if (textString.length > 0) {
            addItemToList(textString, 0);
        }
        saveData();
    });
}
