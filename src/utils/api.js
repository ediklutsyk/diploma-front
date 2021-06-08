import axios from 'axios';
import {SERVER_URL} from '../config/config';


export const login = (data) => {
    return axios.post(`${SERVER_URL}/users/login`, data).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    })
};

export const signUp = (data) => {
    return axios.post(`${SERVER_URL}/users`, data).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    })
};

export const getCategories = (data) => {
    // 'Authorization': `Bearer ${payload.token}`
    return axios.get(`${SERVER_URL}/categories/user`, data).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    })
};