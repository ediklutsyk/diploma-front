const defaultCategory = {color: '#252C3B', name: 'Iнше', icon: 'more.svg'};

const initialState = {
    category: defaultCategory
};

const expense = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.payload
            };
        case 'REMOVE_CATEGORY':
            return {
                ...state,
                category: defaultCategory
            };
        default:
            return state;
    }
};

export default expense;