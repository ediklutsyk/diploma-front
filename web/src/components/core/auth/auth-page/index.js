import React from 'react';
import Button from '@material-ui/core/Button';
import './styles.scss';
import {useDispatch} from 'react-redux';
import allActions from "../../../../store/actions";


export const AuthPage = () => {
    // const userData = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <div className="btns-wrapper flex-end">
            <Button color="primary" variant="contained" className="mr-10" onClick={() => {
                dispatch(allActions.modal.openLogin());
            }}>Log In</Button>
            <Button color="primary" variant="contained" onClick={() => {
                dispatch(allActions.modal.openSignUp());
            }}>Sign Up</Button>
        </div>
    );
};
