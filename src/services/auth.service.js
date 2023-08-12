import { api } from "./axios.service";

export async function login(body){
    return api.post("/login",body);
}
export async function register(body){
    return api.post("/register",body);
}