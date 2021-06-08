const switchedPane = (data) => {
    return {
        type: 'SWITCHED_PANE', message: data
    };
};

export default {
    switchedPane
};