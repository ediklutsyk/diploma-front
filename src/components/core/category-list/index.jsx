import React from 'react';
import dayjs from 'dayjs';

import OperationItem from '../operation-item';

import './styles.scss';
import CategoryItem from "../category-item";
import Button from "@material-ui/core/Button";
import Icon from "../icon";

const CategoryList = ({
    data,
    addNew
}) => {
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
                />
            )) : null}
            <div className="category-item-box" >
                <div className={'addNew'} onClick={addNew}>
                    <Icon icon={'add.svg'} color={'#727272'}/>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;