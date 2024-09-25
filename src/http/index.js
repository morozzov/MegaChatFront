import axios from 'axios'
import {BACKEND_ROUTE} from "../utils";

const Api = axios.create({
    baseURL: `${BACKEND_ROUTE}/api/`
})

const authApi = axios.create({
    baseURL: ''
})

const authInterceptor = config => {
    config.headers.JWT = `Bearer ${localStorage.getItem('token')}`
    return config;
}

authApi.interceptors.request.use(authInterceptor)

export {
    Api,
    authApi
}