import dayjs from 'dayjs';
import React, { useState, useEffect} from 'react';

import './styles.scss';

const MonthSlider = ({
    value,
    onChange
}) => {
    const [currentValue, setCurrentValue] = useState(value ? dayjs(value) : dayjs());

    useEffect(() => {
        if(value) {
            setCurrentValue(dayjs(value));
        } else {
            onChange(currentValue);
        }
    }, [value]);

    const onChangeDate = (action) => () => {
        let newValue = currentValue;
        if(action === 'back') {
            newValue = newValue.subtract(1, 'month');
        } else if(action === 'next') {
            newValue = newValue.add(1, 'month');
        }
        setCurrentValue(newValue);
        onChange(newValue);
    };

    return (
        <div className="month-slider">
            <span className="left arrow" onClick={onChangeDate('back')}></span>
            <p className="current-value">{currentValue.format('MMMM YYYY')}</p>
            <span className="right arrow" onClick={onChangeDate('next')}></span>
        </div>
    );
};

export default MonthSlider;