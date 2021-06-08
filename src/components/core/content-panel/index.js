import React from "react";

export const ContentPanel = (props) => {
    const {children, value, index, component: Component, ...other} = props;

    console.log(props, value !== index)
    return (
        <div hidden={value !== index} {...other}>
            <Component/>
        </div>
    );
}