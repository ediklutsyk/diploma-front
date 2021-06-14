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
import {getCategories, getBills} from "../../../utils/api";
import {lighten} from "@material-ui/core";

import Icon from "../icon";
import CategoryItem from '../category-item';
import BillItem from '../bill-item';

const AddExpense = ({
    open,
    onClose
}) => {
    const [items, setItems] = useState([
        {
            icon: 'groceries',
            name: 'Продукти',
            color: '#0F56B3',
            billName: 'Основна картка',
            totalByCategory: '36',
            comment: 'Сiльпо',
            isIncome: false,
            percent: 10,
            date: '2021-06-09',
            id: 1
        },
        {
            icon: '',
            name: 'Продукти',
            color: '#0F56B3',
            billName: 'Основна картка',
            totalByCategory: '36',
            comment: 'Сiльпо',
            isIncome: false,
            percent: 10,
            date: '2021-06-09',
            id: 2
        },
    ]);
    const [bills, setBills] = useState([
        {
            name: 'Основна картка',
            sum: '15683.35',
            color: '#C5DCFA',
            icon: '',
            type: 'card',
            currency: 'UAH'
        },
        {
            name: 'Готiвка',
            sum: '533',
            color: '#C5F2C7',
            icon: '',
            type: 'cash',
            currency: 'UAH'
        },
    ]);
    const userData = useSelector(state => state.user);

    const [openCategories, setOpenCategories] = useState(false);
    const [openBills, setOpenBills] = useState(false);
    const [sum, setSum] = useState(0);
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

     const handleCategories = () => getCategories({
        token: userData.token,
        month: dayjs().get('month'),
        year: dayjs().get('year')
    }).then((data) => {
        console.log('data', data);
        if(data.data)
            setItems(data.data);
    });

    const handleBills = () => getBills({
        token: userData.token,
        month: dayjs().get('month'),
        year: dayjs().get('year')
    }).then((data) => {
        console.log('data', data);
        if(data.data)
            setBills(data.data);
    });

    const calculateSum = () => {
        const newValue = eval(sum);
        setSum(newValue);
    };

    useEffect(() => {
        handleCategories();
        handleBills();
    }, []);

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
                    <div
                        className="half-width-card"
                        style={{ backgroundColor: lighten(selectedBill.color, 0.5) }}
                        onClick={() => {
                            setOpenBills(!openBills);
                            if(openCategories)
                                setOpenCategories(false);
                        }}
                    >
                        <p>З рахунку</p>
                        <div className="bill-info">
                            {selectedBill.icon && selectedBill.icon.length ?
                            <Icon icon={selectedBill.icon} color={selectedBill.color}/> : null}
                            <p className="name">{selectedBill.name}</p>
                        </div>
                    </div>
                    <div
                        className="half-width-card"
                        style={{ backgroundColor: lighten(selectedCategory.color, 0.5) }}
                        onClick={() => {
                            setOpenCategories(!openCategories);
                            if(openBills)
                                setOpenBills(false);
                        }}
                    >
                        <p>Категорiя</p>
                        <div className="bill-info">
                            {selectedCategory.icon && selectedCategory.icon.length ?
                            <Icon icon={selectedCategory.icon} color={selectedCategory.color}/> : null}
                            <p className="name">{selectedCategory.name}</p>
                        </div>
                    </div>  
                </div>
                {openCategories && items.length ? items.map((item) => (
                    <CategoryItem
                        key={item._id}
                        icon={item.icon}
                        name={item.name}
                        color={item.color}
                        total={item.totalByCategory}
                        percent={item.percent}
                        onClick={(el) => {
                            setSelectedCategory(el);
                            setOpenCategories(false);
                        }}
                    />
                )) : null}
                {openBills && bills.length ? bills.map((item) => (
                    <BillItem
                        icon={item.icon}
                        billName={item.name}
                        billColor={item.color}
                        sum={item.sum}
                        currency={item.currency}
                        onClick={(el) => {
                            setSelectedBill(el);
                            setOpenBills(false);
                        }}
                    />
                )) : null}
                <div className="expense-content">
                    <p className="title">Витрати:</p>
                    <div className="input-calculator">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            fullWidth
                            placeholder="0 ₴"
                            onChange={(event) => {
                                setSum(event.target.value);
                            }}
                            value={sum}
                        />
                        <div
                            className="calculator"
                            style={{ backgroundColor: lighten('#8CE590', 0.5) }}
                            onClick={calculateSum}
                        >
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