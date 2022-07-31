let txtTodoInput = document.querySelector("#txtTodoInput");
let btnAddTodo = document.querySelector("#btnAddTodo");
let todoListItems = document.querySelector("#todoListItems");
let totalTasks = document.querySelector("#totalTasks");
let totalTaskRemaining = document.querySelector("#totalTaskRemaining");
let totalTasksDone = document.querySelector("#totalTasksDone");
let dateText = document.querySelector("#dateText");

let taskListBody = document.querySelector("#taskListBody");
let todoArray = [];

// uses moment.js to get current date
dateText.innerHTML = moment().format("dddd, MMMM, D");

/**
 * Create list item for todo list
 * @param {string} todoText 
 * @param {integer} id 
 * @returns 
 */
let todoItemMaker = (todoText, id) => {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-start" data-taskid="${id}">
        <input class="form-check-input me-1 checkbox" type="checkbox" data-taskid="${id}">
        <label class="form-check-label todo-text" for="firstCheckbox" data-taskid="${id}" >${todoText}</label>
        <i class="fa-solid fa-trash-can remove-task" data-taskid="${id}"></i>
    </li>
    `;
};

// update total tasks, total tasks remaining and total tasks done
let updateTotals = () => {
  totalTasks.innerHTML = todoArray.length;
  totalTaskRemaining.innerHTML = todoArray.filter((todo) => !todo.completed).length;
  totalTasksDone.innerHTML = todoArray.filter((todo) => todo.completed).length;
};

// add todo item to todoArray
let addTodoItem = () => {
  // check if todo input is empty
  if (txtTodoInput.value === "" || txtTodoInput.value === " ") {
    return;
  }

  // add id, text and completed status to todoArray
  let uuid = todoArray.length + 1;
  // chek if the uuid is already in the array
  while (todoArray.some((todo) => todo.id === uuid)) {
    uuid++;
  }
  
  todoArray.push({
    id: uuid,
    text: txtTodoInput.value,
    completed: false,
  });

  console.log(todoArray);

  // add list item to todoListItems
  // is this way of adding a list item is better than using innerHTML because it doesnt reset the entire list each time we add a new item
  todoListItems.insertAdjacentHTML ("beforeend", todoItemMaker(txtTodoInput.value, uuid));

  // todoListItems.innerHTML += todoItemMaker(txtTodoInput.value, uuid);
  txtTodoInput.value = "";
  updateTotals();
};

/**
 * Remove todo item from todoArray
 * @param {integer} removeElement 
 */
let removeTodoItem = (removeElement) => {
  // remove item from todoArray where id object matches removeElement.dataset.taskid
  todoArray.forEach((todo) => {
    if (todo.id === Number(removeElement.dataset.taskid)) {
      todoArray.splice(todoArray.indexOf(todo), 1);
    }
  });
  
  removeElement.parentElement.remove();
  console.log(todoArray);

  updateTotals();
};

/**
 * Receives checkbox and updates completed status
 * @param {object} inputElement 
 */
let completeTodoTask = (inputElement) => {
  console.log(inputElement.dataset.taskid);
  // change completed status to true on todoArray where id matches inputElement.dataset.taskid or change to false if already true
  todoArray.forEach((todo) => {
    if (todo.id === parseInt(inputElement.dataset.taskid)) {
      todo.completed = !todo.completed;
    }
  });

  console.log(todoArray);

  // add or remove css class of list item to completed or not completed
  if (!inputElement.checked) {
    inputElement.parentElement.classList.remove("text-decoration-line-through");
  } else {
    inputElement.parentElement.classList.add("text-decoration-line-through");
  }

  updateTotals();
};

// add todo item to todoArray when button is clicked
btnAddTodo.addEventListener("click", () => {
  addTodoItem();
});

// remove todo item from todoArray when remove icon is clicked
taskListBody.addEventListener("click", (e) => {
    if (e.target.tagName === "I") {
        removeTodoItem(e.target);
    }
});

// check if checkbox is checked or nor and update completed status
taskListBody.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    completeTodoTask(e.target);
  }
});

// add todo item to todoArray when enter is pressed
txtTodoInput.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    addTodoItem();
  }
});
