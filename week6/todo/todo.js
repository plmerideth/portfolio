import {storeToDo, readToDo} from './ls.js';
import {getTimeStamp, updateToDoCountLabel, updateStatusWindow} from './utilities.js';


class toDoList
{
  constructor(elementID)
  {
    this.parentElement = document.getElementById(elementID);
    this.taskDisplay = "all"; //Tracks which to do events to display
    this.taskCount = 0;  //Counts how many to do tasks are being displayed
  }

  showToDoList()
  {
    this.parentElement.innerHTML="";
    renderToDoList(this.parentElement, myToDoList);
    updateStatusWindow(myToDoList);
    updateToDoCountLabel(myToDo);
  }

  displayContentWindow()
  {
    //change class to show back-ground image
    const divToDoListID = document.getElementById('divToDoList');
    divToDoListID.classList.remove('showToDoImage');


    let divNewContentID = document.getElementById('divNewContent');
    divNewContentID.innerHTML = `<h1>Enter To Do Description</h1><textarea class="toDoDescription" id="toDoDescription"></textarea><button class="toDoButton" id="saveToDoButton">Save To Do Item</button><button class="cancelToDoButton" id="cancelToDoButton">Cancel</button>`

    //give focus to text box
    const textBoxID = document.getElementById('toDoDescription').focus();
    //textBoxID.getElementById.select();

    const saveToDoID = document.getElementById('saveToDoButton');
    saveToDoID.addEventListener('click', addToDoItem);
    const cancelToDoID = document.getElementById('cancelToDoButton');
    cancelToDoID.addEventListener('click', cancelToDoContent);
  }
} //End of toDoList class
//************************************************************

//Create myToDo from toDoList class
const myToDo = new toDoList("toDoList");
window.addEventListener('load', ()=>
{
  myToDo.showToDoList();
});

//Read data stored in localstorage and parse into array of objects
let readData = readToDo();
let myToDoList = JSON.parse(readData);

updateToDoCountLabel(myToDo);
updateStatusWindow(myToDoList);

function renderToDoList(parent, list)
{
  myToDo.taskCount = 0; //initialize to zero
  list.forEach(function(v, i)
  {
    if(myToDo.taskDisplay === "all")
    {
      myToDo.taskCount++;
      parent.appendChild(renderOneToDo(v, i));

      //Add event listener for checkbox
      let boxID = "cb"+i;
      const checkBoxId = document.getElementById(boxID);
      checkBoxId.addEventListener('click', updateCompletion)

      //Add event listener for delete button
      let buttonID = "del"+i;
      const delButtonId = document.getElementById(buttonID);
      delButtonId.addEventListener('click', deleteItem)
    }
    else if(myToDo.taskDisplay==="active" && v.completed===false)
    {
      myToDo.taskCount++;
      parent.appendChild(renderOneToDo(v, i));

      //Add event listener for checkbox
      let boxID = "cb"+i;
      const checkBoxId = document.getElementById(boxID);
      checkBoxId.addEventListener('click', updateCompletion)

      //Add event listener for delete button
      let buttonID = "del"+i;
      const delButtonId = document.getElementById(buttonID);
      delButtonId.addEventListener('click', deleteItem)
    }
    else if(myToDo.taskDisplay==="completed" && v.completed===true)
    {
      myToDo.taskCount++;
      parent.appendChild(renderOneToDo(v, i));

      //Add event listener for checkbox
      let boxID = "cb"+i;
      const checkBoxId = document.getElementById(boxID);
      checkBoxId.addEventListener('click', updateCompletion)

      //Add event listener for delete button
      let buttonID = "del"+i;
      const delButtonId = document.getElementById(buttonID);
      delButtonId.addEventListener('click', deleteItem)
    }
  });

  const divToDoListID = document.getElementById('divToDoList');
  if(myToDo.taskCount === 0)
  {
    //change class to show back-ground image
    divToDoListID.classList.add('showToDoImage');
  }
  else
  {
      //change class to hide back-ground image
      divToDoListID.classList.remove('showToDoImage');
  }
}

function renderOneToDo(toDo, i)
{
  const item = document.createElement("li");
  item.setAttribute('data-name', toDo.name);
  let cbUniqueID = "cb"+i; //Give each checkbox a unique ID
  let delUniqueID = "del"+i; //Give each delete button a unique ID
  if(toDo.completed === true)
  {
    item.setAttribute("class", "toDoChecked");
    item.innerHTML =`<form class="itemForm" name="itemCompleted" action="#"><input type="checkbox" id="${cbUniqueID}" name="completed" value="done" checked="checked"/></form><h2 class="toDoItemChecked">${toDo.content}</h2>`;
  }
  else
  {
    item.innerHTML =`<form class="itemForm" name="itemCompleted" action="#"><input type="checkbox" id="${cbUniqueID}" name="completed" value="done"/></form><h2 class="toDoItem">${toDo.content}</h2>`;
  }
  item.innerHTML+=` <div class="toDoItem">
    <p><strong>Created: </strong>${toDo.created}</p>
    <button class="deleteButton" id="${delUniqueID}">Delete To Do</button>
    <hr style="width:100%; text-align:left; margin:7px 0 0 0"></div>`;

  return item;
}


function addToDoItem()
{
  const textID = document.getElementById('toDoDescription');

  let newID = myToDoList.length+1;
  let arrayID = myToDoList.length;

  let formatNow = getTimeStamp();

  myToDoList[myToDoList.length]=
  {
    created: formatNow,
    id: newID,
    content: textID.value,
    completed: false
  }

  const listID = document.getElementById('toDoList');
  listID.appendChild(renderOneToDo(myToDoList[myToDoList.length-1], arrayID));

  //Add event listener for checkbox
  let boxID = "cb"+arrayID;
  const checkBoxId = document.getElementById(boxID);
  checkBoxId.addEventListener('click', updateCompletion)

  //Add event listener for delete button
  let buttonID = "del"+arrayID;
  const delButtonId = document.getElementById(buttonID);
  delButtonId.addEventListener('click', deleteItem)

  myToDo.taskCount++; //increment to do counter
  updateToDoCountLabel(myToDo); //display 'Check Box' or "No To Do"
  updateStatusWindow(myToDoList); //Update remaining task count display

  //Write new to-do out to local storage
  localStorage.removeItem('myToDoList');
  storeToDo(myToDoList);

  //Restore divNewContent innerHTML = ""
  let divNewContentID = document.getElementById('divNewContent');
  divNewContentID.innerHTML ="";
}

function cancelToDoContent()
{
  let divNewContentID = document.getElementById('divNewContent');
  divNewContentID.innerHTML ="";

  // this.parentElement.innerHTML=`<button class="addToDoButton" id="addToDo">Add New To Do</button>`;
  // const addToDo = document.getElementById('addToDo');
  // addToDo.addEventListener('click', myToDo.displayContentWindow);
  return;
}


function deleteItem(event)
{
  let index = event.currentTarget.id;
  index = index.substring(3);
  myToDoList.splice(index,1);
  //iterate thru array and reset id to match index
  myToDoList.forEach(function(_v, i, a)
  {
    a[i].id = i+1;
  });

  updateToDoCountLabel(myToDo);
  myToDo.showToDoList();

  //Write new to do out to local storage
  localStorage.removeItem('myToDoList');
  storeToDo(myToDoList);
}

function updateCompletion(event)
{
  let index = event.currentTarget.id;
  index = index.substring(2);
  myToDoList[index].completed = event.currentTarget.checked;
  myToDo.showToDoList();

  //Write updated complete status out to local storage
  localStorage.removeItem('myToDoList');
  storeToDo(myToDoList);
}

function showAll()
{
  myToDo.taskDisplay = "all";
  myToDo.showToDoList();
}

function showActive()
{
  myToDo.taskDisplay = "active";
  myToDo.showToDoList();
}

function showCompleted()
{
  myToDo.taskDisplay = "completed";
  myToDo.showToDoList();
}

//Set event listeners for addToDo, showAll, ShowActive,and ShowCompleted buttons
const addToDo = document.getElementById('addToDo');
addToDo.addEventListener('click', myToDo.displayContentWindow);
const showAllButtonID = document.getElementById('showAllButton');
showAllButtonID.addEventListener('click', showAll);
const showActiveButtonID = document.getElementById('showActiveButton');
showActiveButtonID.addEventListener('click', showActive);
const showCompletedButtonID = document.getElementById('showCompletedButton');
showCompletedButtonID.addEventListener('click', showCompleted);
