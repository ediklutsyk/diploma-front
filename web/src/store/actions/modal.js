const openLogin = () => {
    return {
        type: 'OPEN_LOGIN'
    };
};

const closeLogin = () => {
    return {
        type: 'CLOSE_LOGIN'
    };
};

const openSignUp = () => {
    return {
        type: 'OPEN_SIGNUP'
    };
};

const closeSignUp = () => {
    return {
        type: 'CLOSE_SIGNUP'
    };
};

export default {
    openLogin,
    closeLogin,
    openSignUp,
    closeSignUp
};