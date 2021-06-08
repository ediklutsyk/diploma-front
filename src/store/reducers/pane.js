const initialState = {
    index: 2
};

const pane = (state = initialState, action) => {
    switch(action.type) {
        case 'SWITCHED_PANE':
            return {
                ...state,
                index: action.message
            };
        default:
            return state;
    }
};

export default pane;