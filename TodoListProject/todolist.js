// Tüm Elementleri Seçtim.

const form = document.querySelector("#todoAddForm");

const AddInput = document.querySelector("#todoName");

const todoList = document.querySelector(".list-group");

const firstCardBody = document.querySelectorAll(".card-body")[0];

const secondCardBody = document.querySelectorAll(".card-body ")[1];

const clearButton = document.querySelector("#clearButton");

const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvent();

function runEvent() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded)
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", removeAllTodoStorage);
    filterInput.addEventListener("keyup", filter);

}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoList = document.querySelectorAll(".list-group-item");
    if (todoList.length > 0) {
        todoList.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {

                todo.setAttribute("style", "display : block");
            }
            else {
                todo.setAttribute("style", "display : none !important");
            }
        });
    }
    else {
        showAlert("warning", "Arama yapmanız için daha önce bir değer eklemiş olmanız gerekir.", "Filtreleme Başarısız", "dark");
    }

}


function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1)
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeAllTodoStorage() {
    const todoList = document.querySelectorAll(".list-group-item");
    if (todoList.length > 0) {
        checkTodosFromStorage();
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        window.location.reload(false);
    }
    else {
        showAlert("warning", "En az bir tane plan olmalı. ", "Silme işlemi Başarısız", "warning");
    }

}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}

function removeTodoToUI(e) {
    if (e.target.className === "fa fa-remove") {
        //Ekrandan silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        //Storage de silme
        removeTodoToStorage(todo.textContent);

        showAlert("success", "Silme işlemi başarılı ", "Başarılı", "dark");
    }
}

function addTodo(e) {
    const inputText = AddInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("danger", " Listeye değer ekleme başarısız. Boş bırakılamaz!  ", "Başarısız", "danger")
    } else {
        //Arayüz ekleme

        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Yeni Plan Eklendi.  ", "Başarılı", "info");
    }

    e.preventDefault();

}

function addTodoToUI(newTodo) {

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    AddInput.value = "";
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message, spanmessage, badge) {

    const div = document.createElement("div");
    div.className = "alert alert-" + type + " mt-4";
    div.textContent = message;

    const SpanElement = document.createElement("span");
    SpanElement.className = "badge badge-pill badge-" + badge;
    SpanElement.textContent = spanmessage;

    div.appendChild(SpanElement);

    firstCardBody.appendChild(div);

    setTimeout(function () {

        div.remove();
    }, 2000);

}