import { bearerToken, baseUrl } from "./config";
const LIST = "#js-list";
const form = $("form");
const input = $("input")[0];

$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${bearerToken}`);
    },
});

async function getToDos() {
    const response = await $.get(`${baseUrl}/todo`);
    return response.records;
}

function clearToDos() {
    $(LIST).empty();
}

async function deleteToDo(id) {
    await $.ajax({
        type: "DELETE",
        url: `${baseUrl}/todo/${id}`,
    });
    generateToDos();
}

function handleDeleteClick(e) {
    const {
        target: { parentNode },
    } = e;
    deleteToDo(parentNode.id);
}

async function generateToDos() {
    const todos = await getToDos();
    clearToDos();
    todos.map((todo) => {
        const {
            fields: { name },
            id,
        } = todo;

        const tempLi = document.createElement("li");
        tempLi.innerHTML = name;
        tempLi.id = id;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "X";
        deleteBtn.addEventListener("click", handleDeleteClick);

        tempLi.appendChild(deleteBtn);
        $(LIST).append(tempLi);
    });
}

async function createToDo(todoString) {
    await $.post(`${baseUrl}/todo`, { fields: { name: todoString } });
}

async function handleSubmit(e) {
    e.preventDefault();
    await createToDo(input.value);
    input.value = "";
    generateToDos();
}

function init() {
    form.submit(handleSubmit);
    generateToDos();
}

init();
