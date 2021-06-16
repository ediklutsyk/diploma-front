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
import {createCategory} from "../../../utils/api";
import {useSelector} from "react-redux";


const AddCategory = ({
                         open,
                         onClose,
                         onSuccess
                     }) => {
    const userData = useSelector(state => state.user);
    const [color, setColor] = useState('#616161')
    const [icon, setIcon] = useState('mode_edit.svg')
    const [name, setName] = useState('')
    const [isOpenIcons, setOpenIcons] = useState(false)


    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };

    const handleCategoryCreation = () => {
        createCategory({
            token: userData.token,
            data: {
                icon: icon,
                color: color,
                name: name
            }
        }).then(r => {
            console.log('Operations created', r)
            onClose();
            onSuccess();
            clearStates()
        })
    }

    const clearStates = () => {
        setColor('#616161');
        setIcon('mode_edit.svg');
        setName('')
    }

    return (
        <>
            <SelectIcon open={isOpenIcons} onClose={() => {
                setOpenIcons(false);
            }} color={color} setIcon={setIcon}/>
            <Dialog open={open} onClose={onClose} fullScreen maxWidth="xs">
                <DialogTitle>
                    <div className={'dialog-title'}>
                        <p>Додати категорiю</p>
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
                            placeholder="Назва Категорії"
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </div>

                    <CirclePicker width={'100%'} circleSpacing={10}
                                  onChangeComplete={handleChangeComplete}
                                  colors={['#ffcf33', '#ED9526', '#DA100B', '#2AB930', '#2B87E3', '#0F56B3', '#00776A', '#730C8F']}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Назад
                    </Button>
                    <Button disabled={!name || name === ''} onClick={() => {
                        handleCategoryCreation()
                    }} color="primary">
                        Додати
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCategory;