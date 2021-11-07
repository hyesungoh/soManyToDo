import { bearerToken, baseUrl } from "./config";
const list = $("#js-list")[0];
const form = $("form");

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

function init() {
    form.submit(function (event) {
        event.preventDefault();
        console.log("asd");
    });

    generateToDos();
}

init();
