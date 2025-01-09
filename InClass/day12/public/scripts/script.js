function callHello() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/API/hello");
  xhr.addEventListener("load", () => {
    console.log(xhr.responseText);
  });
  xhr.send();
}

async function callHelloUsingFetchApi() {
  const response = await fetch("/API/hello");
  if (response.ok) {
    let text = await response.text();
    console.log(text);
  }
}

function addItemToList(itemString, status) {
  let list1 = document.querySelector("#list1");
  let list2 = document.querySelector("#list2");
  let li = document.createElement("li");
  li.textContent = itemString;
  
  if (status == 0) {
    list1.append(li);
  } else {
    list2.append(li);
    li.style.textDecoration = "line-through";
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
      li.style.textDecoration = "";
      list1.appendChild(li);
    } else {
      li.style.textDecoration = "line-through";
      list2.appendChild(li);
    }
    saveData(); // Do a save when an item changes lists.
  });
}

function setupListener() {
  document.querySelector("#button1").addEventListener("click", () => {
    let textString = document.querySelector("#text1").value;
    if (textString.length > 0) {
      addItemToList(textString, 0);
    }
    saveData(); // Save on button click!
  });
}

// ADD listener to run on page load
window.addEventListener("load", (event) => {
  console.log("page is fully loaded");

  setupListener();
  loadData();
});

// TODOs
//  1 - make a function for responseReceivedHandler (generic handler console logging to show we got a response from an ajax call)
//  2 - getCurrentData() get the values and load into a javascript object
//  3 - saveData()  what to do when the save button is clicked
//  4 - loadData()  what to do when the load button is clicked
//  5 - make a function for loadDataHandler  (what to do when the server returns a response with the shopping_list )
//  6 - setupButtonListeners() attach the click listeners to the buttons
//  7 - clearData() clear the current lists

function loadData() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/API/LOAD");
  xhr.addEventListener("load", () => {
    // console.log(xhr.responseText);
    let shoppingList = JSON.parse(xhr.responseText);
    // console.log(shoppingList);

    for (let key in shoppingList) {
      addItemToList(key, shoppingList[key]);
    }
  });
  xhr.send();
}

function getCurrentData() {
  let currentData = {};
  document.querySelectorAll("#list1 li").forEach( (element) => {
    let itemText = element.textContent;
    currentData[itemText] = 0;
  } );

  document.querySelectorAll("#list2 li").forEach( (element) => {
    let itemText = element.textContent;
    currentData[itemText] = 1;
  } );
  return currentData;
}

function saveData() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/API/SAVE");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send( JSON.stringify(getCurrentData()) );
}