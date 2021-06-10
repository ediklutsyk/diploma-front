import React, { useState, useEffect } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';

import './styles.scss';
import OperationList from '../../core/operation-list';
import MonthSlider from '../../core/month-slider';

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

const Operations = () => {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        // todo make request
        console.log('elected date')
    }, [selectedDate]);

    const groupByDates = (data) => {
        const result = [];
        data.forEach(item => {
            const index = result.findIndex((el) => {
                console.log('ek', el, item, item.date === el.date, [...result])
                return item.date === el.date;
            });
            if(index >= 0) {
                result[index].data.push(item);
                result[index].sum += +item.sum;
            }
            else {
                result.push({
                    date: item.date,
                    sum: +item.sum,
                    data: [item]
                });
            }
        });
        console.log('result', result)
        return result;
    };

    useEffect(() => {
        setItems(groupByDates(data));
    }, []);

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