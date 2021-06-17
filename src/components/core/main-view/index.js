import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ContentPanel} from "../content-panel";
import Home from "../../pages/home";
import Operations from "../../pages/operations";
import Bill from "../../pages/bills";
import Category from "../../pages/category";
import Stats from "../../pages/stats";
import AddExpense from "../add-expense";


export const MainView = () => {
    const dispatch = useDispatch();
    const paneData = useSelector(state => state.pane);
    const [isOpenAddExpense, setIsOpenAddExpense] = useState(false);
    const [modalType, setModalType] = useState('expense');

    console.log(paneData)

    return (
        <div>
            <AddExpense
                open={isOpenAddExpense}
                onClose={() => {
                    setIsOpenAddExpense(false);
                }}
                modalType={modalType}
            />
            <ContentPanel value={paneData.index} index={0} component={Bill}/>
            <ContentPanel value={paneData.index} index={1} component={Category} addExpense={setIsOpenAddExpense}/>
            <ContentPanel value={paneData.index} index={2} component={Home} addExpense={(props)=>{
                setIsOpenAddExpense(props.isOpen)
                setModalType(props.modalType)
            }}/>
            <ContentPanel value={paneData.index} index={3} component={Operations}/>
            <ContentPanel value={paneData.index} index={4} component={Stats}/>
        </div>
    );
};
