import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AddExpense from '../../core/add-expense';

import './styles.scss';

const Home = () => {
    const dispatch = useDispatch();
    const [isOpenAddExpense, setIsOpenAddExpense] = useState(false);

    return (
        <>
            <AddExpense
                open={isOpenAddExpense}
                onClose={() => {
                    setIsOpenAddExpense(false);
                }}
            />
            <div className="home-wrapper">
                <p>Home works</p>
                <div className="header">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setIsOpenAddExpense(true);
                        }}
                        startIcon={<FontAwesomeIcon
                            icon={['fas', 'plus']}
                            className="fa-lg"
                        />}
                    >
                        Додати Дохiд
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Home;