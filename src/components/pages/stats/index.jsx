import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';
import {getStats} from "../../../utils/api";
import {Bar} from "react-chartjs-2";
import Icon from "../../core/icon";
import ProgressBar from "@ramonak/react-progress-bar";

const createDataset = (data) => {
    const categories = data.categories;
    return {
        labels: categories.map(() => {
            return ''
        }),
        datasets: [{
            barPercentage: 0.3,
            minBarLength: 5,
            data: categories.map(category => {
                return category.totalByCategory
            }),
            backgroundColor: categories.map(category => {
                return category.color
            }),
        }]
    }
};

const chartOptions = {
    responsive: true,
    // indexAxis: 'y',
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false
        }
    },
}

const calculateProgressBarValue = (completed, goalSum) => {
    console.log((completed / goalSum))
    return completed > 0 ? (completed / goalSum) * 100 : 0;
};

const Stats = ({shown}) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user)
    const [stats, setStats] = useState({})

    useEffect(() => {
        getStats({
            token: userData.token
        }).then(data => {
            console.log(data.data)
            setStats(data.data)
        })
    }, [shown])

    return (
        <div className="home-wrapper">
            {stats && stats.categories && stats.categories.length ?
                <div className="categories-stats">
                    <Bar data={createDataset(stats)} options={chartOptions}/>
                    <div className="categories">
                        {stats.categories.map(category => {
                            return (
                                <div className="category-row">
                                    <Icon icon={category.icon} color={category.color}/>
                                    <div className="right-side">
                                        <div className="name-sum">
                                            <p className="name">{category.name}</p>
                                            <p className="sum">{category.totalByCategory} ₴</p>
                                        </div>
                                        <ProgressBar
                                            completed={category.percent}
                                            bgColor={category.color}
                                            className="progress-bar"
                                            labelAlignment={'outside'}
                                            labelColor={category.color}
                                            labelSize={'14px'}
                                            height={5}
                                        />
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
                : null}
        </div>
    );
};

export default Stats;