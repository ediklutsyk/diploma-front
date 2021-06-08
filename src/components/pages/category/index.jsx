import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';

const Category = () => {
    const dispatch = useDispatch();

    return (
        <div className="home-wrapper">
            <p>Category works</p>
        </div>
    );
};

export default Category;