import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';

const Stats = () => {
    const dispatch = useDispatch();

    return (
        <div className="home-wrapper">
            <p>Stats works</p>
        </div>
    );
};

export default Stats;