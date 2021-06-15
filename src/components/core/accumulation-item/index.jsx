import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

import './styles.scss';
import Icon from "../icon";

const AccumulationItem = ({
                              name,
                              icon,
                              color,
                              balance,
                              currency,
                              goals
                          }) => {

    const calculateProgressBarValue = (completed, goalSum) => {
        return completed > 0 ? (completed * 100 / goalSum) : 0;
    };

    return (
        <div className="accumulation-item">
            <Icon icon={icon} color={color}/>
            <div className="right-row">
                <div className="name-sum">
                    <p className="name">{name}</p>
                    <p className="sum">{balance} {currency || '₴'}</p>
                </div>
                {goals && goals.length ? goals.filter(item => item.name !== 'Загальний').map((item) => (
                    <div className="goal-item">
                        <p className="goal-name">{item.name}</p>
                        <ProgressBar
                            completed={calculateProgressBarValue(item.current_balance, item.required_balance)}
                            bgColor={item.color}
                            isLabelVisible={false}
                            className="progress-bar"
                            height={5}
                        />
                    </div>
                )) : null}
            </div>
        </div>
    );
};

export default AccumulationItem;