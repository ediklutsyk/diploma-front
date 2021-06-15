import React from 'react';

import './styles.scss';
import Icon from "../icon";

const OperationItem = ({
                           categoryIcon,
                           categoryName,
                           categoryColor,
                           billName,
                           amount,
                           description,
                           type
                       }) => {
    return (
        <div className="operation-item-box">
            <div className="left-row">
                <Icon icon={categoryIcon} color={categoryColor}/>
                <div className="info-box">
                    <div className="category-bill">
                        <p className="category-name">{categoryName}</p>
                        <p className="bill-name">{billName}</p>
                    </div>
                    {description ? <p className="comment">{description}</p> : null}
                </div>
            </div>
            <div className="right-row">
                {type === 'spend' ? '-' : ''}{amount} ₴
            </div>
        </div>
    );
};

export default OperationItem;