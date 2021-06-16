import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import './styles.scss';
import Button from '@material-ui/core/Button';
import Icon from "../icon";


const iconsNames = [
    // 'ad_units.svg',
    // 'airplanemode_active.svg',
    'attractions.svg',
    'back.svg',
    'bank.svg',
    'beach_access.svg',
    'biotech.svg',
    'build.svg',
    'card.svg',
    'celebration.svg',
    'child_friendly.svg',
    'cleaning_services.svg',
    'close.svg',
    'desktop_windows.svg',
    'devices_other.svg',
    'directions_bus.svg',
    'emoji_food_beverage.svg',
    'ev_station.svg',
    'face.svg',
    'fastfood.svg',
    'favorite.svg',
    'fitness_center.svg',
    'flight_takeoff.svg',
    'fork-and-knife.svg',
    'front-of-bus.svg',
    'groceries.svg',
    'handyman.svg',
    'hardware.svg',
    'headset.svg',
    // 'headset_mic.svg',
    'home.svg',
    'icecream.svg',
    // 'liquor.svg',
    'local_cafe.svg',
    'local_car_wash.svg',
    'local_dining.svg',
    'local_florist.svg',
    // 'local_gas_station.svg',
    'local_hospital.svg',
    'local_hotel.svg',
    'local_laundry_service.svg',
    'local_pizza.svg',
    // 'local_taxi.svg',
    // 'luggage.svg',
    'lunch_dining.svg',
    'mode_edit.svg',
    // 'more.svg',
    'museum.svg',
    'pedal_bike.svg',
    'photo_camera.svg',
    'public.svg',
    'ramen_dining.svg',
    'receipt.svg',
    'router.svg',
    'school.svg',
    'science.svg',
    'sentiment_satisfied_alt.svg',
    'settings_input_hdmi.svg',
    // 'shop.svg',
    'shopping_bag.svg',
    'shopping_basket.svg',
    'shopping_cart.svg',
    'sick.svg',
    'sports_esports.svg',
    'sports_volleyball.svg',
    'stay_current_portrait.svg',
    // 'store.svg',
    'storefront.svg',
    'table_rows.svg',
    'theater_comedy.svg',
    // 'theaters.svg',
    // 'train.svg',
    'videogame_asset.svg',
    'wallet.svg',
    'weekend.svg',
    'work.svg']

const SelectIcon = ({
                        open,
                        onClose,
                        color,
                        setIcon
                    }) => {

    const [iconName, setIconName] = useState('');


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>
                <div className={'dialog-title'}>
                    <p>Обрати зображення</p>
                    <div className="icon" onClick={onClose}>
                        <Icon icon={'close.svg'} color={'#72778D'} noBackground={true}/>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="icons">
                    {iconsNames && iconsNames.length ? iconsNames.map(name => (
                        <div style={{borderColor: name === iconName ? color : null}} className={'icon-wrapper'}
                             onClick={() => setIconName(name)}>
                            <Icon icon={name} color={name === iconName ? color : '#616161'}/>
                        </div>
                    )) : null}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Назад
                </Button>
                <Button disabled={!iconName || iconName === ''} onClick={() => {
                    setIcon(iconName)
                    onClose()
                }} color="primary">
                    Додати
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SelectIcon;