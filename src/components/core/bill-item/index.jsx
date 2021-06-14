import React from 'react';

import './styles.scss';

const BillItem = ({
    icon,
    billName,
    billColor,
    sum,
    currency,
    onClick
}) => {
    return (
        <div className="bill-item-box" onClick={() => {
            if(onClick)
                onClick({
                    icon,
                    name: billName,
                    color: billColor,
                    sum,
                    currency
                });
        }}>
            <div className="left-row">
                <div className="image">
                    <div className="background-color" style={{ backgroundColor: billColor }}></div>
                    <img src={`${process.env.PUBLIC_URL}/core-icons/${icon}.svg`}/>
                </div>
                <div className="info-box">
                    <p className="bill-name">{billName}</p>
                </div>
            </div>
            <div className="right-row">
                {sum} {currency || '₴'}
            </div>
        </div>
    );
};

export default BillItem;