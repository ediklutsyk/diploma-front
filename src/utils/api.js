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

//Categories

export const createCategory = (payload) => {
    return axios.post(`${SERVER_URL}/categories`, payload.data,
        {headers: {Authorization: 'Bearer ' + payload.token}}).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error)
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

export const createBill = (payload) => {
    return axios.post(`${SERVER_URL}/bills`, payload.data,
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

export const newTemplate = (payload) => {
    return axios.post(`${SERVER_URL}/templates`, payload.data, {headers: {Authorization: 'Bearer ' + payload.token}})
        .then((response) => {
            return response;
        }).catch((error) => {
            return error;
        })
};

export const getTemplates = (payload) => {
    return axios.get(`${SERVER_URL}/templates/user`, {headers: {Authorization: 'Bearer ' + payload.token}})
        .then((response) => {
            return response;
        }).catch((error) => {
            return error;
        })
};

export const proceedAction = (payload) => {
    return axios.post(`${SERVER_URL}/bills/action`, payload.data, {headers: {Authorization: 'Bearer ' + payload.token}})
        .then((response) => {
            return response;
        }).catch((error) => {
            return error;
        })
};

export const getStats = (payload) => {
    return axios.get(`${SERVER_URL}/categories/stats`, {headers: {Authorization: 'Bearer ' + payload.token}})
        .then((response) => {
            return response;
        }).catch((error) => {
            return error;
        })
};
