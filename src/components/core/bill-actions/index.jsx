import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import './styles.scss';
import Icon from "../icon";
import {getBills, proceedAction} from "../../../utils/api";
import {useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import BillItem from "../bill-item";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {lighten} from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        '&.Mui-selected': {
            color: 'green',
            border: 0
        },
        '&.Mui-selected img': {
            filter: 'invert(35%) sepia(98%) saturate(552%) hue-rotate(77deg) brightness(96%) contrast(86%)'
        },
        border: 0,
        fontSize: '10px',
        padding: '0 10px',
    }
});

const BillActions = ({
                         open,
                         onClose,
                         type,
                         bill
                     }) => {
    const userData = useSelector(state => state.user);
    const [tabIndex, setTabIndex] = useState(0)
    const [amount, setAmount] = useState(null)
    const [bills, setBills] = useState([])
    const [selectedBill, setSelectedBill] = useState({})
    const classes = useStyles();

    useEffect(() => {
        getBills(userData.token).then((data) => {
            setBills(data.data);
        })
    }, [])

    const handleAction = () => {
        let data = {
            amount: amount,
            fromId: bill.id,
        }
        switch (tabIndex) {
            case 0:
                data = {
                    ...data,
                    action: 'move',
                    toId: selectedBill._id
                }
                break;
            case 1:
                data = {
                    ...data,
                    action: 'add',
                }
                break;
            case 2:
                data = {
                    ...data,
                    action: 'refresh',
                }
                break;
        }
        console.log('data action', data)
        proceedAction({
            token: userData.token,
            data: data
        }).then(r => {
            console.log('Action proceeded', r)
            onClose();
            clearStates()
        })
    }

    const clearStates = () => {
        setAmount(null)
        setTabIndex(0)
        setBills([])
        setSelectedBill({})
    }

    const handleChange = (event, value) => {
        setTabIndex(value);
    };

    const typeName = type === 'regular' ? 'Рахунку' : 'Накопичення';

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
                <DialogTitle>
                    <div className={'dialog-title'}>
                        <p>Додавання {typeName}</p>
                        <div className="icon" onClick={onClose}>
                            <Icon icon={'close.svg'} color={'#72778D'} noBackground={true}/>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Tabs value={tabIndex} onChange={handleChange}
                          centered={true}
                          variant={"fullWidth"}
                          TabIndicatorProps={{
                              style: {
                                  backgroundColor: "#1F8B24",
                              },
                          }}
                          textColor="primary">
                        <Tab icon={<Icon icon={'east.svg'} color={'#616C7A'} noBackground={true}/>}
                             classes={{root: classes.root}} label="Перевести"/>
                        <Tab icon={<Icon icon={'north.svg'} color={'#1F8B24'} noBackground={true}/>}
                             classes={{root: classes.root}} label="Поповнити"/>
                        <Tab icon={<Icon icon={'refresh.svg'} color={'#C4C4C4'} noBackground={true}/>}
                             classes={{root: classes.root}} label="Баланс"/>
                    </Tabs>
                    {tabIndex === 0 && <div className={'move'}>
                        <div className="bills-list">
                            {bills.length ? bills.filter(item => item.type === type && item._id !== bill.id).map((item) => (
                                <div style={selectedBill._id === item._id ? {
                                    backgroundColor: lighten(item.color, 0.8),
                                    paddingRight: '10px',
                                    borderRadius: '5px'
                                } : {paddingRight: '10px'}}>
                                    <BillItem
                                        icon={item.icon}
                                        name={item.name}
                                        color={item.color}
                                        balance={item.balance}
                                        currency={item.currency}
                                        onClick={() => {
                                            setSelectedBill(item);
                                        }}
                                    />
                                </div>
                            )) : null}
                        </div>
                        <TextField margin="dense" id="name"
                                   type="number"
                                   fullWidth
                                   placeholder={0}
                                   label={"Сумма"}
                                   value={amount}
                                   onChange={(event) => {
                                       setAmount(parseInt(event.target.value));
                                   }}/>
                    </div>
                    }
                    {tabIndex === 1 && <div className={'add'}>
                        <TextField margin="dense" id="name"
                                   type="number"
                                   fullWidth
                                   placeholder={0}
                                   label={"Сумма"}
                                   value={amount}
                                   onChange={(event) => {
                                       setAmount(parseInt(event.target.value));
                                   }}/>
                    </div>}
                    {tabIndex === 2 && <div className={'refresh'}>
                        <TextField margin="dense" id="name"
                                   type="number"
                                   fullWidth
                                   placeholder={0}
                                   label={"Баланс"}
                                   value={bill.balance}
                                   onChange={(event) => {
                                       setAmount(parseInt(event.target.value));
                                   }}/>
                    </div>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Назад
                    </Button>
                    <Button disabled={amount && amount === 0} onClick={() => {
                        handleAction()
                    }} color="primary">
                        Додати
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default BillActions;