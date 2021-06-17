import React from 'react';

import './styles.scss';
import CategoryItem from "../category-item";
import Icon from "../icon";
import allActions from "../../../store/actions";
import {useDispatch} from "react-redux";

const CategoryList = ({
                          data,
                          addNew,
                          addExpense
                      }) => {
    const dispatch = useDispatch();
    return (
        <div className="category-list">
            {data && data.length ? data.map(item => (
                <CategoryItem
                    key={item._id}
                    icon={item.icon}
                    name={item.name}
                    color={item.color}
                    total={item.totalByCategory}
                    percent={item.percent}
                    onClick={() => {
                        addExpense(true);
                        dispatch(allActions.expense.setCategory(item));
                    }}
                />
            )) : null}
            <div className="category-item-box">
                <div className={'addNew'} onClick={addNew}>
                    <Icon icon={'add.svg'} color={'#727272'}/>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;