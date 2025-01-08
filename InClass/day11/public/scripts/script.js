// Existing items that should be in the list
const existingList = ["milk", "eggs", "bread", "sugar"]


// TODO 1 - Complete this function to add an item to the existing list on the page
function addItemToList(itemString) {
  let list1 = document.querySelector("#list1");
  let list2 = document.querySelector("#list2");
  let myLi = document.createElement("li");
  myLi.textContent = itemString;
  list1.append(myLi);

  // Give these li elements some powers!
  myLi.addEventListener("mouseover", () => {
    myLi.style.backgroundColor = "red";
    myLi.style.color = "white";
  });
  
  myLi.addEventListener("mouseout", function() {
    this.style.backgroundColor = "";
    this.style.color = "";
  });


  myLi.addEventListener("click", () => {
    if (myLi.style.textDecoration == "line-through") {
        myLi.style.textDecoration = "";
        list1.append(myLi);
    } else {
        myLi.style.textDecoration = "line-through";
        list2.append(myLi);
    }
  });
  
}

// TODO 2 - Complete this function to add all items from the existingList to the page
function addExistingList() {
    for (let i = 0; i < existingList.length; i++) {
        addItemToList(existingList[i]);
    }
}

function setupCallbacks() {
    document.querySelector("#button1").addEventListener("click", () => {
        let textString = document.querySelector("#text1").value;
        if (textString.length > 0) {
            addItemToList(textString);
        }
    });
}

// TODO 3 - Make it so that you don't have to run the command from the console, but
// instead it will run automatically.
window.addEventListener("load", () => {
    console.log("The page has loaded");
    addExistingList();
    setupCallbacks();
});



