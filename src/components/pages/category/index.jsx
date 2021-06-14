import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';
import MonthSlider from "../../core/month-slider";
import {getCategories} from "../../../utils/api";
import {Doughnut} from "react-chartjs-2";
import CategoryList from "../../core/category-list";


const dataChart = {
    datasets: [
        {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#032c55',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
        },
    ],

};

const chartOptions = {
    cutout: 105,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        tooltip: {
            enabled: false
        }
    }
}

const Category = () => {
    const userData = useSelector(state => state.user);
    const [items, setItems] = useState([]);
    // const [dataSet, setDataSet] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        console.log('selected date', selectedDate)
        if (selectedDate) {
            handleCategories(selectedDate.get('month'), selectedDate.get('year')).catch(error => {
                console.log('handled categories by selected date error', error)
            });
        }
    }, [selectedDate]);

    const handleCategories = (month, year) => getCategories({
        token: userData.token,
        month: month + 1,
        year: year
    }).then((data) => {
        console.log('data', data);
        setItems(data.data);
        // setDataSet()
    });

    return (
        <div className="category-wrapper">
            <MonthSlider onChange={setSelectedDate}/>
            <div className="chart">
                <div className="spending">
                    <div className="spending-content">
                        <p>Витрати</p>
                        <p className="total">{items.reduce((accumulator, currentValue) => accumulator + currentValue.totalByCategory, 0)} ₴</p>
                    </div>
                </div>
                {/*{console.log('dataset render', dataSet, dataSet.datasets)}*/}
                {items && items.length >0 ? <Doughnut data={{
                    datasets: [
                        {
                            data: items.map(item => item.totalByCategory),
                            backgroundColor: items.map(item => item.color),
                        },
                    ]
                }} options={chartOptions}/>: null}

            </div>
            <CategoryList data={items}/>
        </div>
    );

};

export default Category;
