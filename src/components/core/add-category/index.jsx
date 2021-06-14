import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';    
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';
import Button from '@material-ui/core/Button';
import {lighten} from "@material-ui/core";

const AddCategory = ({
    open,
    onClose
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Додати категорiю
                <FontAwesomeIcon
                    icon={['fal', 'times']}
                    className="fa-lg"
                    onClick={onClose}
                />
            </DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Назад
                </Button>
                <Button onClick={() => {}} color="primary">
                    Додати
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCategory;