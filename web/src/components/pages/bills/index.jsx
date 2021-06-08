import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';

const Bill = () => {
    const dispatch = useDispatch();

    return (
        <div className="home-wrapper">
            <p>Bill works</p>
        </div>
    );
};

export default Bill;