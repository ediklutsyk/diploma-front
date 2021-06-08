import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../../../store/actions';
import {signUp} from "../../../../utils/api";
import {useHistory} from "react-router-dom";

const SignupDialog = () => {
    const open = useSelector(state => state.modal.signupDialog);
    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleSignUp = () => {
        signUp(state).then((data) => {
            console.log('data', data)
            dispatch(allActions.user.requestSignUpSuccess(data.data));
            localStorage.setItem('userData', JSON.stringify(data.data));
            dispatch(allActions.modal.closeSignUp());
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
        dispatch(allActions.modal.closeSignUp());
    };

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
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
                <Button onClick={handleSignUp} color="primary">
                    Sign Up
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SignupDialog;