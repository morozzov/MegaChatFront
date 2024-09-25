import {Api, authApi} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (username, password, name) => {
    const {data} = await Api.post(`auth/register`, {
        "username": username,
        "password": password,
        "name": name,
    });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const login = async (username, password) => {
    const {data} = await Api.post(`auth/authenticate`, {"username": username, "password": password}) //ссылка для aвторизации пользователя
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const checkUsername = async (username) => {
    return await Api.get(`auth/check-username`, {
        params: {
            "username": username
        }
    })
}

export const getByCurrent = async (token) => {
    return await Api.get(`user/current`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
}

export const getById = async (token, id) => {
    return await Api.get(`user/${id}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
}