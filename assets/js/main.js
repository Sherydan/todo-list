let txtTodoInput = document.querySelector('#txtTodoInput')
let btnAddTodo = document.querySelector('#btnAddTodo');
let todoListItems = document.querySelector('#todoListItems')
let totalTasks = document.querySelector('#totalTasks')
let totalTaskRemaining = document.querySelector('#totalTaskRemaining')
let totalTasksDone = document.querySelector('#totalTasksDone')


let taskListBody = document.querySelector('#taskListBody')
let todoArray = [];

let todoItemMaker = (todoText, id) =>{
    return `
    <li class="list-group-item d-flex justify-content-between align-items-start" data-taskid="${id}">
        <input class="form-check-input me-1 checkbox" type="checkbox" data-taskid="${id}">
        <label class="form-check-label todo-text" for="firstCheckbox" data-taskid="${id}" >${todoText}</label>
        <i class="fa-solid fa-trash-can remove-task" data-taskid="${id}"></i>
    </li>
    `
}

// update total tasks, total tasks remaining and total tasks done
let updateTotals = () => {
    totalTasks.innerHTML = todoArray.length;
    totalTaskRemaining.innerHTML = todoArray.filter(todo => !todo.completed).length;
    totalTasksDone.innerHTML = todoArray.filter(todo => todo.completed).length;
}


let addTodoItem = () => {
    // add new item to list
    if (txtTodoInput.value === "" || txtTodoInput.value === " ") {
        return 
    }

    // let uuid = todoArray.length +1 
    // todoArray.push({
    //     id: uuid,
    //     text: txtTodoInput.value,
    //     completed: false
    // });

    // add id, text and completed status to todoArray
    let uuid = todoArray.length + 1;
    todoArray.push({
        id: uuid,
        text: txtTodoInput.value,
        completed: false
    });

    console.log(todoArray)

    todoListItems.innerHTML +=  todoItemMaker(txtTodoInput.value, uuid);
    txtTodoInput.value = "";
    updateTotals();
}

let removeTodoItem = (removeElement) => {
    // remove item from todoArray where id object matches removeElement.dataset.taskid
    todoArray.forEach(todo => {
        if (todo.id === Number(removeElement.dataset.taskid)) {
            todoArray.splice(todoArray.indexOf(todo), 1);
        }
    }
    )
    removeElement.parentElement.remove();
    console.log(todoArray);

    updateTotals();
}

let completeTodoTask = (inputElement) => {
    console.log(inputElement.dataset.taskid)
    // change completed status to true on todoArray where id matches inputElement.dataset.taskid or change to false if already true
    todoArray.forEach(todo => {
        if (todo.id === parseInt(inputElement.dataset.taskid)) {
            todo.completed = !todo.completed;
        }
    }
    )

    console.log(todoArray)

    if (!inputElement.checked) {
        inputElement.parentElement.classList.remove('text-decoration-line-through')
    } else {
        inputElement.parentElement.classList.add('text-decoration-line-through')
    }

    updateTotals();
    
   
}




btnAddTodo.addEventListener('click', () => {
    addTodoItem();
})

taskListBody.addEventListener('click', (e) =>{
    switch (e.target.tagName) {
        case "I":  
            removeTodoItem(e.target);
            break;
    }
    
})

taskListBody.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        completeTodoTask(e.target)
    }
        
    }
)

txtTodoInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        addTodoItem();
    }
})





