import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import './styles.scss';
import Button from '@material-ui/core/Button';
import {getBills, getCategories, newOperation} from "../../../utils/api";
import {lighten} from "@material-ui/core";

import Icon from "../icon";
import CategoryItem from '../category-item';
import BillItem from '../bill-item';
import InputAdornment from "@material-ui/core/InputAdornment";


const defaultBill = {color: '#0F56B3', name: 'Основна картка', icon: 'card.svg'};
const defaultCategory = {color: '#252C3B', name: 'Iнше', icon: 'more.svg'};


const AddExpense = ({
                        open,
                        onClose,
                    }) => {
    const userData = useSelector(state => state.user);

    const [openCategories, setOpenCategories] = useState(false);
    const [openBills, setOpenBills] = useState(false);
    const [sum, setSum] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(defaultBill);
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

    const handleCategories = () => getCategories({
        token: userData.token,
        month: dayjs().get('month') + 1,
        year: dayjs().get('year')
    }).then((data) => {
        console.log('data', data);
        if (data.data) {
            setCategories(data.data);
            const category = data.data.find(item => item.name === 'Інше')
            if (category) {
                setSelectedCategory(category)
            }
        }
    });

    const handleBills = () => getBills(userData.token).then((data) => {
        console.log('data', data);
        if (data.data) {
            setBills(data.data);
            setSelectedBill(data.data[0])
        }
    });

    const handleCreation = () => {
        console.log('handleCreate 1', selectedCategory, selectedBill)
        const data = {
            amount: calculateSum(),
            type: 'spend',
            category_id: selectedCategory._id,
            bill_id: selectedBill._id,
            description: description
        }
        console.log('handleCreate 2', data)
        newOperation({
            token: userData.token,
            data: data
        }).then(r => {
            console.log('Operations created', r)
            onClose();
            clearStates()
        })
    }

    const clearStates = () => {
        handleCategories();
        handleBills();
        setOpenCategories(false)
        setOpenBills(false)
        setSum('')
        setDescription('')
        setSelectedBill(defaultBill)
        setSelectedCategory(defaultCategory)
    }

    const calculateSum = () => {
        const newValue = eval(sum);
        setSum(newValue);
        return newValue
    };

    useEffect(() => {
        handleCategories();
        handleBills();
    }, []);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <div className={'dialog-title'}>
                    <p>Додати витрату</p>
                    <div className="icon" onClick={onClose}>
                        <Icon icon={'close.svg'} color={'#72778D'} noBackground={true}/>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="header-card-category">
                    <div className="half-width-card"
                         style={{borderRadius: '5px 0 0 5px', backgroundColor: lighten(selectedBill.color, 0.75)}}
                         onClick={() => {
                             setOpenBills(!openBills);
                             if (openCategories)
                                 setOpenCategories(false);
                         }}>
                        <p>З рахунку</p>
                        <div className="bill-info">
                            {selectedBill.icon && selectedBill.icon.length ?
                                <div className="icon">
                                    <Icon icon={selectedBill.icon} color={selectedBill.color} noBackground={true}/>
                                </div> : null}
                            <p className="name">{selectedBill.name}</p>
                        </div>
                    </div>
                    <div className="half-width-card"
                         style={{borderRadius: '0 5px 5px 0', backgroundColor: lighten(selectedCategory.color, 0.75)}}
                         onClick={() => {
                             setOpenCategories(!openCategories);
                             if (openBills)
                                 setOpenBills(false);
                         }}>
                        <p>Категорiя</p>
                        <div className="bill-info">
                            {selectedCategory.icon && selectedCategory.icon.length ?
                                <div className="icon">
                                    <Icon icon={selectedCategory.icon} color={selectedCategory.color}
                                          noBackground={true}/>
                                </div> : null}
                            <p className="name">{selectedCategory.name}</p>
                        </div>
                    </div>
                </div>
                {openCategories ?
                    <div className="select-category-list">
                        {categories.length ? categories.map((item) => (
                            <CategoryItem
                                key={item._id}
                                icon={item.icon}
                                name={item.name}
                                color={item.color}
                                total={item.totalByCategory}
                                percent={item.percent}
                                onClick={() => {
                                    setSelectedCategory(item);
                                    setOpenCategories(false);
                                }}
                            />
                        )) : null}
                    </div> : null
                }
                {openBills ?
                    <div className="bills-list">
                        {categories.length ? bills.filter(item => item.type !== 'storing').map((item) => (
                            <BillItem
                                icon={item.icon}
                                name={item.name}
                                color={item.color}
                                balance={item.balance}
                                currency={item.currency}
                                onClick={() => {
                                    setSelectedBill(item);
                                    setOpenBills(false);
                                }}
                            />
                        )) : null}
                    </div> : null
                }
                <div className="expense-content">
                    <p className="title">Витрати:</p>
                    <div className="input-calculator">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            fullWidth
                            placeholder="0"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        ₴
                                    </InputAdornment>
                                )
                            }}
                            onChange={(event) => {
                                setSum(event.target.value);
                            }}
                            value={sum}
                        />
                        <div className="calculator"
                             style={{backgroundColor: lighten('#8CE590', 0.5)}}
                             onClick={calculateSum}>
                            <Icon icon='calculate.svg' color='#155D18' noBackground={true}/>
                        </div>
                    </div>
                    <TextField
                        inputProps={{min: 0, style: {textAlign: 'center'}}}
                        autoFocus
                        margin="dense"
                        id="descriptions"
                        fullWidth
                        placeholder="Опис"
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Назад
                </Button>
                <Button onClick={() => {
                    handleCreation()
                }} disabled={!sum || sum === 0} color="primary">
                    Додати
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddExpense;