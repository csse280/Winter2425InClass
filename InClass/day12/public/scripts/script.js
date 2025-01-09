// use string replace...
const existingList = ["milk", "eggs", "bread", "sugar"]

function addExistingList() {
  let list1 = document.querySelector("#list1")
  existingList.forEach( (item) => {
    addItemToList(item);
  });
}


function addItemToList(itemString) {
  let list1 = document.querySelector("#list1")
  let li = document.createElement("li");
  li.textContent = itemString;
  list1.append(li);
  
  // Add a mouseover event listener to change the style on hover
  li.addEventListener("mouseover", function() {
    this.style.backgroundColor = "red";
    this.style.color = "white";
  });

  // Add a mouseout event listener to revert the style when the mouse leaves
  li.addEventListener("mouseout", function() {
    this.style.backgroundColor = ""; // Reset to default
    this.style.color = ""; // Reset to default
  });


  li.addEventListener("click", function() {
    if (li.style.textDecoration=="line-through"){
      li.style.textDecoration=""
      let list2 = document.querySelector("#list2");
      //if we move it like this we could use a css rule instead
      list1.appendChild(li);
    } else {
      li.style.textDecoration="line-through"
      //if we move it like this we could use a css rule instead
      let list2 = document.querySelector("#list2");
      list2.appendChild(li);
    }
  });
    
}



function setupListener(){

  document.querySelector("#button1").addEventListener( "click", () => {
    let textString = document.querySelector("#text1").value;
    if (textString.length > 0) {
      addItemToList(textString);
    }
  });
}

// ADD listener to run on page load
window.addEventListener("load", (event) => {
  console.log("event occurred: " + event);
  console.log("page is fully loaded");
  addItemToList("Add First Item");
  setupListener();
  addExistingList();
});


// TODOs
//  1 - make a function for responseReceivedHandler (generic handler console logging to show we got a response from an ajax call)
//  2 - getCurrentData() get the values and load into a javascript object
//  3 - saveData()  what to do when the save button is clicked
//  4 - loadData()  what to do when the load button is clicked
//  5 - make a function for loadDataHandler  (what to do when the server returns a response with the shopping_list )
//  6 - setupButtonListeners() attach the click listeners to the buttons
//  7 - clearData() clear the current lists



