import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';    
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';
import Button from '@material-ui/core/Button';

import { hexToRgbA } from '../../../utils/convertor';
import Icon from "../icon";

const AddExpense = ({
    open,
    onClose
}) => {
    const [selectedBill, setSelectedBill] = useState({
       color: '#C5DCFA',
        name: 'Основний рахунок',
        icon: ''
    });
    const [selectedCategory, setSelectedCategory] = useState({
        color: '#E0E0E0',
         name: '*** Iнше',
         icon: ''
     });
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Додати витрату
                <FontAwesomeIcon
                    icon={['fal', 'times']}
                    className="fa-lg"
                    onClick={onClose}
                />
            </DialogTitle>
            <DialogContent>
                <div className="header-card-category">
                    <div className="half-width-card" style={{ backgroundColor: hexToRgbA(selectedBill.color, 0.5) }}>
                        <p>З рахунку</p>
                        <div className="bill-info">
                            {selectedBill.icon && selectedBill.icon.length ?
                            <Icon icon={selectedBill.icon} color={selectedBill.color}/> : null}
                            <p className="name">{selectedBill.name}</p>
                        </div>
                    </div>
                    <div className="half-width-card" style={{ backgroundColor: hexToRgbA(selectedCategory.color, 0.5) }}>
                        <p>З рахунку</p>
                        <div className="bill-info">
                            {selectedCategory.icon && selectedCategory.icon.length ?
                            <Icon icon={selectedCategory.icon} color={selectedCategory.color}/> : null}
                            <p className="name">{selectedCategory.name}</p>
                        </div>
                    </div>  
                </div>
                <div className="expense-content">
                    <p className="title">Витрати:</p>
                    <div className="input-calculator">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            fullWidth
                            placeholder="0 ₴"
                        />
                        <div className="calculator" style={{ backgroundColor: hexToRgbA('#8CE590', 0.5) }}>
                            <Icon icon='' color='#8CE590'/>
                        </div>
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        placeholder="Опис"
                    />
                </div>
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
};

export default AddExpense;