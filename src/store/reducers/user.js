const initialState = {
    user: null,
    token: null,
    loading: false,
    error: false,
};

const user = (state = initialState, action) => {
    console.log('action', action)
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
                user: null,
                token: null,
                loading: true,
                error: false,
            };
        case 'REQUEST_LOGIN_SUCCEEDED':
            return {
                user: action.message.user,
                token: action.message.token,
                loading: false,
                error: false,
            };
        case 'REQUEST_LOGIN_FAILED':
            return {
                user: null,
                token: null,
                loading: false,
                error: true,
            };
        case 'REQUEST_SIGNUP':
            return {
                user: null,
                token: null,
                loading: true,
                error: false,
            };
        case 'REQUEST_SIGNUP_SUCCEEDED':
            return {
                user: action.message.user,
                token: action.message.token,
                loading: false,
                error: false,
            };
        case 'REQUEST_SIGNUP_FAILED':
            return {
                user: null,
                token: null,
                loading: false,
                error: true,
            };
        case 'REQUEST_LOG_OUT':
            return {
                ...state,
                loading: true
            }
        case 'REQUEST_LOG_OUT_SUCCEEDED':
            console.log('REQUEST_LOG_OUT_SUCCEEDED')
            return {
                user: null,
                token: null,
                loading: false,
                error: false
            }
        case 'REQUEST_LOG_OUT_FAILED':
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default user;