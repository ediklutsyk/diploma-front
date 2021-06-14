import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';
import MonthSlider from "../../core/month-slider";
import {getCategories} from "../../../utils/api";
import CategoryItem from "../../core/category-item";
import {Doughnut} from "react-chartjs-2";

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

const dataChart = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
        },
    ],

};

const options = {
    cutoutPercentage: 60
}

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
            <div className="chart">
                <span>{items.reduce((accumulator, currentValue) => accumulator + currentValue.totalByCategory, 0)}</span>
                <Doughnut data={dataChart} options={{
                    cutout: 130,
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        tooltip: {
                            enabled: false
                        }
                    }
                }}/>
            </div>

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
