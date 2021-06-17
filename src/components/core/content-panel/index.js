import React from "react";

export const ContentPanel = (props) => {
    console.log('ContentPanel')
    const {children, value, index, addExpense, component: Component, ...other} = props;

    console.log(props, value !== index)
    const shown = value === index;
    return (
        <div hidden={!shown} {...other}>
            <Component shown={shown} addExpense={addExpense}/>
        </div>
    );
}