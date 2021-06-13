import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

import './styles.scss';

const AccumulationItem = ({
    name,
    icon,
    color,
    sum,
    currency,
    goals
}) => {

    const calculateProgressBarValue = (completed, goalSum) => {
        return completed > 0 ? (completed * 100 / goalSum) : 0;
    };

    return (
        <div className="accumulation-item">
            <div className="image">
                <div className="background-color" style={{ backgroundColor: color }}></div>
                <img src={`${process.env.PUBLIC_URL}/core-icons/${icon}.svg`}/>
            </div>
            <div className="right-row">
                <div className="name-sum">
                    <p className="name">{name}</p>
                    <p className="sum">{sum} {currency || '₴'}</p>
                </div>
                {goals && goals.length ? goals.map((item) => (
                    <div className="goal-item">
                        <p className="goal-name">{item.name}</p>
                        <ProgressBar
                            completed={calculateProgressBarValue(item.current_balance, item.required_balance)}
                            bgColor={item.color}
                            isLabelVisible={false}
                        />
                    </div>
                )) : null}
            </div>
        </div>
    );
};

export default AccumulationItem;