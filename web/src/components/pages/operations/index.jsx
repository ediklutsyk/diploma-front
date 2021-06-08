import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';

const Operations = () => {
    const dispatch = useDispatch();

    return (
        <div className="home-wrapper">
            <p>Operations works</p>
        </div>
    );
};

export default Operations;