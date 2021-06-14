import React from 'react';
import dayjs from 'dayjs';

import OperationItem from '../operation-item';

import './styles.scss';
import CategoryItem from "../category-item";

const CategoryList = ({
    data
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
        </div>
    );
};

export default CategoryList;