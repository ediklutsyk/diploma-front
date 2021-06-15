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

export const getCategories = (payload) => {
    return axios.get(`${SERVER_URL}/categories/user?month=${payload.month}&year=${payload.year}`,
        {headers: {Authorization: 'Bearer ' + payload.token}}).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    })
};

export const getOperations = (payload) => {
    return axios.get(`${SERVER_URL}/operations/user?month=${payload.month}&year=${payload.year}`,
        {headers: {Authorization: 'Bearer ' + payload.token}}).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    })
};

export const getBills = (payload) => {
    return axios.get(`${SERVER_URL}/bills/user`,
        {headers: {Authorization: 'Bearer ' + payload}}).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    })
};

export const newOperation = (payload) => {
    return axios.post(`${SERVER_URL}/operations`, payload.data, {headers: {Authorization: 'Bearer ' + payload.token}})
        .then((response) => {
        return response;
    }).catch((error) => {
        return error;
    })
};
