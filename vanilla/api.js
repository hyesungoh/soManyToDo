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
    instance.get(...args);
}

export function post(...args) {
    instance.post(...args);
}

export function del(...args) {
    instance.delete(...args);
}
