const setCategory = (category) => {
    return {
        type: 'SET_CATEGORY',
        payload: category
    };
};

const removeCategory = () => {
    return {
        type: 'REMOVE_CATEGORY'
    };
};

export default {
    setCategory,
    removeCategory
};