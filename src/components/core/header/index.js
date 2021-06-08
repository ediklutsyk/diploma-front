import React, {useEffect, useState} from 'react';
import './styles.scss';
import {useDispatch} from 'react-redux';
import {Navigation} from "../navigation";

const Header = () => {
    const [showSearch, setShowSearch] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setShowSearch(window.location.pathname === '/');
    }, [window.location.pathname]);

    return (
        <div className="header-app">
            <div className="navigation">
                <Navigation/>
            </div>
        </div>
    );
};

export default Header;