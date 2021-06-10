import React from 'react';

import './styles.scss';

const OperationItem = ({
    icon,
    categoryName,
    categoryColor,
    billName,
    sum,
    comment,
    isIncome
}) => {
    return (
        <div className="operation-item-box">
            <div className="left-row">
                <div className="image">
                    <div className="background-color" style={{ backgroundColor: categoryColor }}></div>
                    <img src={`${process.env.PUBLIC_URL}/core-icons/${icon}.svg`}/>
                </div>
                <div className="info-box">
                    <div className="category-bill">
                        <p className="category-name">{categoryName}</p>
                        <p className="bill-name">{billName}</p>
                    </div>
                    {comment ? <p className="comment">{comment}</p> : null}
                </div>
            </div>
            <div className="right-row">
                {!isIncome ? '-' : ''}{sum} ₴
            </div>
        </div>
    );
};

export default OperationItem;