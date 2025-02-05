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


async function loadData() {
  console.log("loadData")
  let response = await fetch("/API/LOAD")
  console.log("handling response: " + response.status)
  let serverData = await response.json()
  clearData()
  for (let key in serverData) {
      console.log(key)
      if (serverData[key] == 0) {
          addItemToList(key, 0)
      } else {
          addItemToList(key, 1)
      }
  }
}


async function saveData() {

  // 1. Encode the form data
  currentData = getCurrentData();
  const urlEncodedData = new URLSearchParams(currentData).toString();
  console.log(urlEncodedData);
  // 2. Make the POST request [Content-Type = URL encoding]
  let response = await fetch("/API/SAVE", {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlEncodedData
  });
  console.log("AJAX REQUEST SENT");

  // 3. Get the response text
  let responseText = await response.text()

  // 4. Print the response text.
  console.log("handling response: ");
  console.log(responseText);






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
