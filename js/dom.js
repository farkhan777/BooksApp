const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId";

const makeTodo = (data, author, timestamp, isCompleted) => {

    const textTitle = document.createElement("h1");
    textTitle.innerText = data;

    const textAuthor = document.createElement("h2");
    textAuthor.innerText = "Penulis: " + author;

    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = "Tahun: " + timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthor, textTimestamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

const createUndoButton = () => {
    return createButton("undo-button", (e) => {
        undoTaskFromCompleted(e.target.parentElement);
    });
}

const createTrashButton = () => {
    return createButton("trash-button", (e) => {
        removeTaskFromCompleted(e.target.parentElement);
    });
}

const createCheckButton = () => {
    return createButton("check-button", (e) => {
        addTaskToCompleted(e.target.parentElement);
    });
}

const createButton = (buttonTypeClass, eventListener) => {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", (e) => {
        eventListener(e);
        e.stopPropagation();
    });
    return button;
}

const addTodo = () => {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;
    const author = document.getElementById("author").value;

    const todo = makeTodo(textTodo, author, timestamp, false);
    const todoObject = composeTodoObject(textTodo, author, timestamp, false);
    
    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);

    uncompletedTODOList.append(todo);
    updateDataToStorage();
}

const addTaskToCompleted = (taskElement) => {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h1").innerText;
    const textAuthor = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, textAuthor, taskTimestamp, true);
    

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newTodo[TODO_ITEMID] = todo.id;

    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

const removeTaskFromCompleted = (taskElement) => {

    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

const undoTaskFromCompleted = (taskElement) => {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h1").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;
    
    const newTodo = makeTodo(taskTitle, taskAuthor, taskTimestamp, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;

    listUncompleted.append(newTodo);
    taskElement.remove();
    
    updateDataToStorage();
}

const refreshDataFromTodos = () => {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    for(todo of todos){
        const newTodo = makeTodo(todo.task, todo.author, todo.timestamp, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;

        if(todo.isCompleted){
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
    }
}