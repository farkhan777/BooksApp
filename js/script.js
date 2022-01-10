// Note:
//
// Di sini saya hanya melakukan improvisasi pada aplikasi todoApp yang sebelumnya.

document.addEventListener("DOMContentLoaded", () => {

    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTodo();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
});
