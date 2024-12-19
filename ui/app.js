
function fetchAllTodos() {
    const todoList = document.getElementById("todo-list-all");
    fetch("http://localhost:3000/api/todos")
        .then((response) => response.json())
        .then((todos) => {
            todoList.innerHTML = "";
            todos.forEach((todo) => {
                if (todo.completed == 0) {
                    const todoTitle = createTodoElementForHome(todo);
                    todoList.append(todoTitle);
                }
            });
        }).catch((error) =>
            console.error("error in fetching todo tasks", error)
        )
}

function createTodoElementForHome(todo) {
    const todoLi = document.createElement("li");
    todoLi.className = "todo";
    todoLi.innerHTML = `
        <button class="custom-check-button" id="${todo.id}" ${todo.completed ? "checked" : ""
        } onclick="markAsCompleted(${todo.id})">
            <svg fill="var(--secondary-color)"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
            <path d="M16.293 8.293 11 13.586l-2.293-2.293-1.414 1.414L11 16.414l6.707-6.707-1.414-1.414z"/>
            </svg>
            <span class="tooltip">Mark Task as Completed</span>
        </button>
        <span class="todo-text">${todo.title}</span>
        <span class="todo-date">${todo.due_date || ""}</span>
        <button class="delete-button" onclick="deleteTodoItem(${todo.id})">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
            <span class="tooltip">Delete Task</span>
        </button>`;
    return todoLi;
}

fetchAllTodos();

function deleteTodoItem(id) {
    fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    }).then((response) => response.json)
        .then(() => {
            console.log("todo item deleted sucessfully");
        }).catch((error) => {
            console.log("Error in deleting todo item", error);
            alert("Error in deleting todo item")
        })
}

function markAsCompleted(id) {
    fetch(`http://localhost:3000/api/todos/${id}/completed`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        console.log("Updated Successfully")
    }).catch((error) => {
        console("Couldn't update", error)
    })
}



