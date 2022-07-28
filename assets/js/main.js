let txtTodoInput = document.querySelector('#txtTodoInput')
let btnAddTodo = document.querySelector('#btnAddTodo');
let todoListItems = document.querySelector('#todoListItems')


let taskListBody = document.querySelector('#taskListBody')
let todoArray = [];

let todoItemMaker = (todoText, id) =>{
    return `
    <li class="list-group-item d-flex justify-content-between align-items-start">
        <input class="form-check-input me-1" type="checkbox" data-task-id="${id}">
        <label class="form-check-label" for="firstCheckbox" data-task-id="${id} >${todoText}</label>
        <i class="fa-solid fa-trash-can" data-task-id="${id}></i>
    </li>
    `
}

let addTodoItem = () => {
    if (txtTodoInput.value === "" || txtTodoInput.value === " ") {
        return 
    }
    todoArray.push({
        id: 1,
        text: txtTodoInput.value,
        completed: false

    })

    console.log(todoArray)
    todoListItems.innerHTML +=  todoItemMaker(txtTodoInput.value, 1);
    txtTodoInput.value = "";
}

let removeTodoItem = () => {
    
}

let completeTodoTask = () => {
    
}

btnAddTodo.addEventListener('click', () => {
    addTodoItem();
})

taskListBody.addEventListener('click', (e) =>{
    if (e.target.type = "checkbox") {
        
    }
    
})





