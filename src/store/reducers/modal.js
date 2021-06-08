const initialState = {
    loginDialog: false,
    signupDialog: false
};

const modal = (state = initialState, action) => {
    switch(action.type) {
        case 'OPEN_LOGIN':
            return {
                ...state,
                loginDialog: true
            };
        case 'CLOSE_LOGIN':
            return {
                ...state,
                loginDialog: false
            };
        case 'OPEN_SIGNUP':
            return {
                ...state,
                signupDialog: true
            };
        case 'CLOSE_SIGNUP':
            return {
                ...state,
                signupDialog: false
            };
        default:
            return state;
    }
};

export default modal;