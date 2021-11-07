import axios from "axios";
import { bearerToken } from "./config";

export const instance = axios.create({
    baseURL: "https://api.airtable.com/v0/app5AO0SumKR9cNKp",
});

function interceptorRequestFulfilled(config) {
    return {
        ...config,
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
    };
}

instance.interceptors.request.use(interceptorRequestFulfilled);

export function get(...args) {
    return instance.get(...args);
}

export function post(...args) {
    return instance.post(...args);
}

export function del(...args) {
    return instance.delete(...args);
}
