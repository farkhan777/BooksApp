const STORAGE_KEY = "TODO_APPS";

let todos = [];

/**
  * Fungsi ini digunakan untuk memeriksa apakah localStorage didukung oleh browser atau tidak
  * 
  * @returns boolean 
  */
 const isStorageExist = () => {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}

/**
 * Fungsi ini digunakan untuk menyimpan data ke localStorage
 * berdasarkan KEY yang sudah ditetapkan sebelumnya.
 */
const saveData = () => {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

/**
 * Fungsi ini digunakan untuk memuat data dari localStorage
 * Dan memasukkan data hasil parsing ke variabel {@see todos}
 */
const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        todos = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

const updateDataToStorage = () => {
    if(isStorageExist())
        saveData();
}

const composeTodoObject = (task, author, timestamp, isCompleted) => {
    return {
        id: +new Date(),
        task,
        author,
        timestamp,
        isCompleted
    };
}

const findTodo = (todoId) => {

    for(todo of todos){
        if(todo.id === todoId)
            return todo;
    }

    return null;
}

const findTodoIndex = (todoId) => {
    
    let index = 0
    for (todo of todos) {
        if(todo.id === todoId)
            return index;

        index++;
    }

    return -1;
}