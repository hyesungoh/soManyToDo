import { bearerToken, baseUrl } from "./config";
const list = $("#js-list")[0];
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
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
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

        list.appendChild(tempLi);
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
