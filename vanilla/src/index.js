// import axios from "axios";
import { get, post, del } from "./api";

const list = document.querySelector(".js-list");
const form = document.querySelector("form");

async function getToDos() {
    const response = await get("/todo");
    return response.data.records;
}

async function generateToDos() {
    const todos = await getToDos();
    console.log(todos);

    todos.map((todo) => {
        const {
            fields: { name, done },
            id,
        } = todo;
        const tempLi = document.createElement("li");
        tempLi.innerHTML = name;
        tempLi.id = id;

        list.appendChild(tempLi);
    });
}

function handleSubmit(e) {
    e.preventDefault();
}

function init() {
    generateToDos();

    form.addEventListener("submit", handleSubmit);
}

init();
