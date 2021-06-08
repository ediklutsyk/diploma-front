import React, {useState} from 'react';
import './styles.scss';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import allActions from "../../../store/actions";
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles({
    root: {
        '&.Mui-selected': {
            color: 'green',
            border: 0
        },
        '&.Mui-selected img': {
            filter: 'invert(35%) sepia(98%) saturate(552%) hue-rotate(77deg) brightness(96%) contrast(86%)'
        },
        border: 0,
        fontSize: '10px',
        padding: '0 10px',
    }
});

export const Navigation = () => {
    const dispatch = useDispatch();
    const [tabState, setTabState] = useState(2)
    const classes = useStyles();

    const handleTabs = (value) => {
        console.log("handle tabs", value)
        setTabState(value);
        dispatch(allActions.pane.switchedPane(value))
    }

    return (
        <Tabs
            value={tabState}
            onChange={(event, value) => {
                handleTabs(value)
            }} centered={true}
            variant={"fullWidth"}
            TabIndicatorProps={{
                style: {
                    display: "none",
                },
            }}
            textColor="primary">
            <Tab classes={{root: classes.root}} label="Рахунки"
                 icon={<img src={process.env.PUBLIC_URL + '/core-icons/bill.svg'} alt={'bill icon'}/>}/>
            <Tab classes={{root: classes.root}} label="Категорії"
                 icon={<img src={process.env.PUBLIC_URL + '/core-icons/categories.svg'} alt={'categories icon'}/>}/>
            <Tab classes={{root: classes.root}}
                 icon={<img src={process.env.PUBLIC_URL + '/core-icons/home.svg'} alt={'home icon'}/>}/>
            <Tab classes={{root: classes.root}} label="Операції"
                 icon={<img src={process.env.PUBLIC_URL + '/core-icons/files.svg'} alt={'files icon'}/>}/>
            <Tab classes={{root: classes.root}} label="Статистика"
                 icon={<img src={process.env.PUBLIC_URL + '/core-icons/statistics.svg'} alt={'statistics icon'}/>}/>
        </Tabs>
    );
};
