import React from 'react';
import dayjs from 'dayjs';

import OperationItem from '../operation-item';

import './styles.scss';

const OperationList = ({
    data,
    date,
    sum
}) => {
    return (
        <div className="operation-list">
            <div className="operation-list-header">
                {date ? <p className="date">{dayjs(date).format('DD MMMM YYYY')}</p> : null}
                {sum ? <p className="sum">-{sum} ₴</p> : null}
            </div>
            {data && data.length ? data.map((item) => (
                <OperationItem
                    categoryIcon={item.categoryIcon}
                    categoryName={item.categoryName}
                    billName={item.billName}
                    categoryColor={item.categoryColor}
                    amount={item.amount}
                    description={item.description}
                    type={item.type}
                />
            )) : null}
        </div>
    );
};

export default OperationList;