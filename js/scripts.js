function ToDoList(toDoListName, nextToDo) {
  this.theListName = toDoListName;
  this.theToDoList = [nextToDo];
}



$(document).ready(function() {
  $("form#new-to-do-list").submit(function(event) {
    event.preventDefault();
    var inputtedListName = $("input#new-list-name").val();
    var inputtedToDo = $("input#new-to-do").val();

    var newToDoList = new ToDoList(inputtedListName, inputtedToDo);

    $("ul#current-to-do-lists").append("<li><span class='theToDo'>" + newToDoList.theListName + "</span></li>");


  });

});
