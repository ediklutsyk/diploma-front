// Action Creators
const requestLogin = () => {
    return {type: 'REQUEST_LOGIN'}
};

const requestLoginSuccess = (data) => {
    console.log('actions login data', data)
    return {type: 'REQUEST_LOGIN_SUCCEEDED', message: data}
};

const requestLoginError = () => {
    return {type: 'REQUEST_LOGIN_FAILED'}
};

const fetchLogin = (data) => {
    console.log('here', data)
    return {type: 'FETCHED_LOGIN', message: data}
};

const requestSignUp = () => {
    return {type: 'REQUEST_SIGNUP'};
};

const requestSignUpSuccess = (data) => {
    return {type: 'REQUEST_SIGNUP_SUCCEEDED', message: data}
};

const requestSignUpError = () => {
    return {type: 'REQUEST_SIGNUP_FAILED'}
};

const fetchSignUp = (data) => {
    console.log('here', data)
    return {type: 'FETCHED_SIGNUP', message: data}
};

const requestLogOut = () => {
    return {type: 'REQUEST_LOG_OUT'};
};

const requestLogOutSuccess = () => {
    return {type: 'REQUEST_LOG_OUT_SUCCEEDED'}
};

const requestLogOutError = () => {
    return {type: 'REQUEST_LOG_OUT_FAILED'}
};

const fetchLogOut = (data) => {
    return {type: 'FETCHED_LOG_OUT', message: data}
};


export default {
    requestLogin,
    requestLoginSuccess,
    requestLoginError,
    fetchLogin,
    requestSignUp,
    requestSignUpSuccess,
    requestSignUpError,
    fetchSignUp,
    requestLogOut,
    requestLogOutSuccess,
    requestLogOutError,
    fetchLogOut,
}