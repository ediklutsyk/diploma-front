import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../../../store/actions';
import {login} from "../../../../utils/api";
import {useHistory} from "react-router-dom";

const LoginDialog = () => {
    const open = useSelector(state => state.modal.loginDialog);
    const dispatch = useDispatch();
    const history = useHistory();
    const [state, setState] = useState({
        email: 'test@gmail.com',
        password: 'Test1234'
    });
    console.log('open', open)


    const handleLogin = () => {
        login(state).then((data) => {
            console.log('data', data)
            dispatch(allActions.user.requestLoginSuccess(data.data));
            localStorage.setItem('userData', JSON.stringify(data.data));
            dispatch(allActions.modal.closeLogin());
            history.push("/");
        });
    };


    const onChange = (name) => (event) => {
        console.log('event', event, name)
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    const handleClose = () => {
        dispatch(allActions.modal.closeLogin());
    };

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    onChange={onChange('email')}
                    value={state.email}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={onChange('password')}
                    value={state.password}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleLogin} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;