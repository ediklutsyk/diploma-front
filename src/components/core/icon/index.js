import React from "react";
import {ReactSVG} from 'react-svg';
import makeStyles from "@material-ui/styles/makeStyles";
import {lighten} from "@material-ui/core";

import './styles.scss';

const getColorHex = (color) => {
    switch (color) {
        case 'yellow':
            return '#FFCF33'
        case 'orange':
            return '#ED9526'
        case 'red':
            return '#DA100B'
        case 'green':
            return '#2AB930'
        case 'blue':
            return '#2B87E3'
        case 'dark_blue':
            return '#0F56B3'
        case 'teal':
            return '#00776A'
        case 'violet':
            return '#730C8F'
        default:
            return '#000000'
    }
}

const useStyles = makeStyles({
    svg: props => ({
        '& svg path': {
            fill: props.color
        }
    })
});

const Icon = ({icon, color}) => {
    const hex = getColorHex(color);
    const classes = useStyles({color: hex});
    return (
        <div className="image" style={{backgroundColor: lighten(hex, 0.8)}}>
            <ReactSVG className={classes.svg} src={`${process.env.PUBLIC_URL}/category-icons/${icon}`}/>
        </div>
    );
};

export default Icon;