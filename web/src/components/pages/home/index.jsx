import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';

const Home = () => {
    const dispatch = useDispatch();

    return (
        <div className="home-wrapper">
            <p>Home works</p>
        </div>
    );
};

export default Home;