import React from 'react';

import './styles.scss';
import Icon from "../icon";

const BillItem = ({
    icon,
    name,
    color,
    balance,
    currency,
    onClick
}) => {
    return (
        <div className="bill-item-box" onClick={() => {
            if(onClick)
                onClick({
                    icon,
                    name: name,
                    color: color,
                    balance,
                    currency
                });
        }}>
            <div className="left-row">
                <Icon color={color} icon={icon}/>
                <div className="info-box">
                    <p className="bill-name">{name}</p>
                </div>
            </div>
            <div className="right-row">
                {balance} {currency || '₴'}
            </div>
        </div>
    );
};

export default BillItem;