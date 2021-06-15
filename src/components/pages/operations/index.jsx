import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';
import OperationList from '../../core/operation-list';
import MonthSlider from '../../core/month-slider';
import {getOperations} from "../../../utils/api";
import dayjs from "dayjs";

const data = [
    {
        icon: '',
        categoryName: 'Продукти',
        categoryColor: '#0F56B3',
        billName: 'Основна картка',
        sum: '36',
        comment: 'Сiльпо',
        isIncome: false,
        date: '2021-06-09',
        id: 1
    },
    {
        icon: '',
        categoryName: 'Продукти',
        categoryColor: '#0F56B3',
        billName: 'Основна картка',
        sum: '36',
        comment: 'Сiльпо',
        isIncome: false,
        date: '2021-06-09',
        id: 2
    },
    {
        icon: '',
        categoryName: 'Продукти',
        categoryColor: '#0F56B3',
        billName: 'Основна картка',
        sum: '36',
        comment: 'Сiльпо',
        isIncome: false,
        date: '2021-06-06',
        id: 3
    },
    {
        icon: '',
        categoryName: 'Продукти',
        categoryColor: '#0F56B3',
        billName: 'Основна картка',
        sum: '36',
        comment: 'Сiльпо',
        isIncome: false,
        date: '2021-06-03',
        id: 4
    }
];

const Operations = ({shown}) => {
    console.log('shown', shown)
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    const [items, setItems] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    useEffect(() => {
        if (selectedDate) {
            handleOperations(selectedDate.get('month'), selectedDate.get('year')).catch(error => {
                console.log('handled categories by selected date error', error)
            });
        }
    }, [selectedDate, shown]);

    const handleOperations = (month, year) => getOperations({
        token: userData.token,
        month: month + 1,
        year: year
    }).then((data) => {
        console.log('data', data);
        setItems(groupByDates(data.data));
    });


    const groupByDates = (data) => {
        const result = [];
        data.forEach(item => {
            let dateObj = dayjs(item.datetime).format('YYYY-MM-DD')
            console.log("dates", dateObj, dayjs(item.datetime), item.datetime)
            const index = result.findIndex((el) => {
                // console.log('ek', el, item, item.datetime === el.date, [...result])
                return dateObj === el.date;
            });
            if (index >= 0) {
                result[index].data.push(item);
                result[index].sum += +item.amount;
            } else {
                result.push({
                    date: dateObj,
                    sum: +item.amount,
                    data: [item]
                });
            }
        });
        console.log('result', result)
        return result;
    };

    /*    useEffect(() => {
            setItems(groupByDates(data));
        }, []);*/

    return (
        <div className="home-wrapper">
            <MonthSlider onChange={setSelectedDate}/>
            {items && items.length ? items.map(el => (
                <OperationList data={el.data} sum={el.sum} date={el.date}/>
            )) : null}
        </div>
    );
};

export default Operations;