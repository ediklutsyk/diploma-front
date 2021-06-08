import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {ContentPanel} from "../content-panel";
import Home from "../../pages/home";
import Operations from "../../pages/operations";
import Bill from "../../pages/bills";
import Category from "../../pages/category";
import Stats from "../../pages/stats";


export const MainView = () => {
    const dispatch = useDispatch();
    const paneData = useSelector(state => state.pane);

    console.log(paneData)

    return (
        <div>
            <ContentPanel value={paneData.index} index={0} component={Bill}/>
            <ContentPanel value={paneData.index} index={1} component={Category}/>
            <ContentPanel value={paneData.index} index={2} component={Home}/>
            <ContentPanel value={paneData.index} index={3} component={Operations}/>
            <ContentPanel value={paneData.index} index={4} component={Stats}/>
        </div>
    );
};
