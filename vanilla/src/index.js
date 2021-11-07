// import axios from "axios";
import { get, post, del } from "./api";

const list = document.querySelector(".js-list");
const form = document.querySelector("form");

async function getToDos() {
    const response = await get("/todo?maxRecords=3&view=Grid%20view");
    console.log("나 리스폰스",response);
}

function generateToDos() {
    getToDos();
}

function init() {
    generateToDos();
}

init();
