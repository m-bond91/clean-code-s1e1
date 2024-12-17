// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.
window.addEventListener("DOMContentLoaded", function () {
  window.location.href = "https://github.com/m-bond91/clean-code-s1e1/pull/1";
});

var taskInput = document.getElementById("new-task"); // Add a new task.
var addButton = document.querySelector(".button-add"); // First button
var incompleteTaskHolder = document.getElementById("tasks-todo"); // ul of #incompleteTasks
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

// New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.className = "task-item";

  // input (checkbox)
  var checkBox = document.createElement("input"); // checkbx
  checkBox.type = "checkbox";
  checkBox.className = "task-checkbox";

  // label
  var label = document.createElement("label"); // label
  label.innerText = taskString;
  label.className = "task-label common";

  // input (text)
  var editInput = document.createElement("input"); // text
  editInput.type = "text";
  editInput.className = "task-edit-input common";

  // button.edit
  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "button button-edit";

  // button.delete
  var deleteButton = document.createElement("button");
  deleteButton.className = "button button-delete";
  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Remove task";
  deleteButton.appendChild(deleteButtonImg);



  // and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  console.log("Add Task...");
  // Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

// Edit an existing task.
var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector(".task-edit-input");
    var label = listItem.querySelector(".task-label");
    var editBtn = listItem.querySelector(".button-edit");
    var containsClass = listItem.classList.contains("edit-mode");
  
    if (containsClass) {
      label.innerText = editInput.value;
      editBtn.innerText = "Edit";
    } else {
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
    }
    listItem.classList.toggle("edit-mode");
};

// Delete task.
var deleteTask = function () {
  console.log("Delete Task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

// Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");
  // Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

// The glue to hold it all together.
// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector(".task-checkbox");
    var editButton = taskListItem.querySelector(".button-edit");
    var deleteButton = taskListItem.querySelector(".button-delete");
  
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
  };

// Cycle over incompleteTaskHolder ul list items
// For each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
  }
  
  for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }
// Issues with usability don't get seen until they are in front of a human tester.
// Prevent creation of empty tasks.
// Change edit to save when you are in edit mode.
