import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import './styles.scss';
import Button from '@material-ui/core/Button';
import {CirclePicker} from "react-color";
import Icon from "../icon";
import SelectIcon from "../select-icon";
import TextField from "@material-ui/core/TextField";
import {createBill} from "../../../utils/api";
import {useSelector} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 80
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AddBill = ({
                     open,
                     onClose,
                     type
                 }) => {
    const userData = useSelector(state => state.user);
    const [color, setColor] = useState('#616161')
    const [isOpenIcons, setOpenIcons] = useState(false)
    const [icon, setIcon] = useState('mode_edit.svg')
    const [name, setName] = useState('')
    const [currency, setCurrency] = useState('UAH')
    const [balance, setBalance] = useState(0)
    const classes = useStyles();


    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };

    const handleBillCreation = () => {
        createBill({
            token: userData.token,
            data: {
                type: type,
                icon: icon,
                color: color,
                name: name,
                balance: balance,
                currency: currency
            }
        }).then(r => {
            console.log('Bill created', r)
            onClose();
            clearStates()
        })
    }

    const clearStates = () => {
        setColor('#616161');
        setIcon('mode_edit.svg');
        setName('')
        setCurrency('UAH')
        setBalance(0)
    }

    const typeName = type === 'regular' ? 'Рахунку' : 'Накопичення';

    return (
        <>
            <SelectIcon open={isOpenIcons} onClose={() => {
                setOpenIcons(false);
            }} color={color} setIcon={setIcon}/>
            <Dialog open={open} onClose={onClose} fullScreen maxWidth="xs">
                <DialogTitle>
                    <div className={'dialog-title'}>
                        <p>Додавання {typeName}</p>
                        <div className="icon" onClick={onClose}>
                            <Icon icon={'close.svg'} color={'#72778D'} noBackground={true}/>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="image-name">
                        <div className={'icon-selector'} onClick={() => setOpenIcons(true)}>
                            <Icon icon={icon} color={color}/>
                        </div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="descriptions"
                            width={'80%'}
                            placeholder={`Назва ${typeName}`}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </div>
                    <CirclePicker width={'100%'} circleSpacing={10}
                                  onChangeComplete={handleChangeComplete}
                                  colors={['#ffcf33', '#ED9526', '#DA100B', '#2AB930', '#2B87E3', '#0F56B3', '#00776A', '#730C8F']}/>

                    <div className="balance">
                        <TextField margin="dense" id="name"
                                   type="number"
                                   placeholder={0}
                                   label={"Баланс"}
                                   value={balance}
                                   onChange={(event) => {
                                       setBalance(parseInt(event.target.value));
                                   }}/>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="currency-label">Валюта</InputLabel>
                            <Select className={'currency'} labelId="currency-label"
                                    value={currency}
                                    renderValue={(currency) => `${currency}`}
                                    onChange={(event) => {
                                        setCurrency(event.target.value);
                                    }}>
                                <MenuItem value="UAH">Гривня (UAH)</MenuItem>
                                {type === 'storing' ? <MenuItem value="USD">Доллар США (USD)</MenuItem> : null}
                                {type === 'storing' ? <MenuItem value="USD">Доллар США (USD)</MenuItem> : null}
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Назад
                    </Button>
                    <Button disabled={!name || name === ''} onClick={() => {
                        handleBillCreation()
                    }} color="primary">
                        Додати
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddBill;