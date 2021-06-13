import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';
import MonthSlider from "../../core/month-slider";
import OperationList from "../../core/operation-list";
import {getCategories, signUp} from "../../../utils/api";
import allActions from "../../../store/actions";
import OperationItem from "../../core/operation-item";
import CategoryItem from "../../core/category-item";

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
const Category = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    const [items, setItems] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        // todo make request
        console.log('elected date')
    }, [selectedDate]);


    useEffect(() => {
        getCategories(userData.token).then((data) => {
            console.log('data', data);
            setItems(data.data);
        });
    }, []);

    return (
        <div className="home-wrapper">
            <MonthSlider onChange={setSelectedDate}/>
            {items && items.length ? items.map(item => (
                    <CategoryItem
                        key={item._id}
                        icon={item.icon}
                        name={item.name}
                        color={item.color}
                        total={item.totalByCategory}
                        percent={item.percent}
                    />
            )) : <p>Category works</p>}
        </div>
    );

};

export default Category;
