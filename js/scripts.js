var counter = 1;
var deleteFromArray;
var realListCounter = 0;
var   listCounter = 0;

function ToDoList(toDoListName, nextToDo) {
  this.theListName = toDoListName;
  this.theToDoList = nextToDo;
  this.listNumber = realListCounter;
}

var clearAddForms = function() {
  $(".form-group-to-do-clone").remove();
  counter = 1;
}

//function that adds the incremented added to do form
var newToDo = function() {
  var newToDoForm = "<div class='form-group-to-do-clone'><label for='new-to-do'>Add a to do</label><input type='text' id='new-to-do" +  counter + "'></div>";
  counter++;
  return newToDoForm;
}

//function that inputs the to do's into an array
var grabToDo = function() {
  var holdArray = [];
  counterClone = 0;
  for(var index = 0; index < counter; index++)
  {
    holdArray[index] = $("input#new-to-do" + counterClone + "").val();
    counterClone++;
  }
  return holdArray;
}

//function that clears forms
var clearForms = function() {
  $("input#new-list-name").val("");
  for(var index = 0; index < counter; index++)
  {
    $("input#new-to-do" + index).val("");
  }
}

//function that displays the array in list form
var clickSort = function(theToDoList) {
  for(var index = 0; index < theToDoList.length; index++)
  {
    $("ul#displayed-list").append("<li><span class='displayList'>" + theToDoList[index] + "</span></li>");
  }
}

var deleteThis = function(itemDelete, itemArray, listNumber) {
  for(var index = 0; index < itemArray.length; index++)
  {
    if(itemArray[index] === itemDelete)
    {
      itemArray.splice(index, 1);
    }
    if(itemArray.length === 0)
    {
      $("#list-number" + listNumber + "").remove();
      $("#show-to-do-list").hide();
    }
  }
    return itemArray;
}

var clearEmptyList = function(listArray) {
  if(listArray.length === 0)
  {
    listArray.remove();
  }
}

$(document).ready(function() {
  $("form#new-to-do-list").submit(function(event) {
    event.preventDefault();
    var placeholder = $("input#new-list-name").val();
    var toDoArray = grabToDo();
    var inputtedListName = placeholder;
    inputtedListName = new ToDoList(inputtedListName, toDoArray);
    realListCounter++;

    clearAddForms();

    //functionality that creates the "To do lists:"
    $("ul#current-to-do-lists").append("<li id='list-number" + listCounter + "'><span class='theToDo'>" + inputtedListName.theListName + "</span></li>");
    listCounter++;

    //functionality that hides/shows the todo list that you click on
    $(".theToDo").last().click(function() {
      $("#displayed-list").empty();
      $("#show-to-do-list").show();
      $("#show-to-do-list h2").text(inputtedListName.theListName);
      clickSort(inputtedListName.theToDoList);
      deleteFromArray = inputtedListName;

    //delete function
      $("form#delete-item").submit(function(event) {
      event.preventDefault();
      var itemToDelete = $("input#list-item-to-delete").val();
      var cleanArray = deleteThis(itemToDelete, deleteFromArray.theToDoList, deleteFromArray.listNumber);
      $("#displayed-list").empty();
      $("input#list-item-to-delete").val("");
      clickSort(cleanArray);
      })

    })

    clearForms();
  })

  //functionality for "add a to do" button
  $("form#add-one-to-do").submit(function(event) {
  event.preventDefault();
  var newestToDo = newToDo();
  $(".to-do-forms").append(newestToDo);
  })

});
