let txtTodoInput = document.querySelector('#txtTodoInput')
let btnAddTodo = document.querySelector('#btnAddTodo');
let todoListItems = document.querySelector('#todoListItems')


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

let addTodoItem = () => {
    if (txtTodoInput.value === "" || txtTodoInput.value === " ") {
        return 
    }

    let uuid = todoArray.length +1 
    todoArray.push({
        id: uuid,
        text: txtTodoInput.value,
        completed: false
    });

    

    todoListItems.innerHTML +=  todoItemMaker(txtTodoInput.value, uuid);
    txtTodoInput.value = "";
}

let removeTodoItem = (removeElement) => {
    console.log(removeElement)
    removeElement.parentElement.remove();
    
}

let completeTodoTask = (taskID) => {
    // toggle text-decoration-line-through class to the task item thats equal to taskId
    let taskItem = document.querySelector(`[data-taskid="${taskID}"]`)
    taskItem.classList.toggle('text-decoration-line-through')
}

btnAddTodo.addEventListener('click', () => {
    addTodoItem();
})

taskListBody.addEventListener('click', (e) =>{
    switch (e.target.tagName) {
        case "INPUT":
            
            break;
        case "LABEL":

            break;
        case "I":  
            removeTodoItem(e.target);
            
            break;
    }
    
})

taskListBody.addEventListener("change", (e) => {
    if (e.target.className === "checkbox") {
        completeTodoTask()
    }
        
    }
)

txtTodoInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        addTodoItem();
    }
})





