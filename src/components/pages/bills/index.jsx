import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BillItem from '../../core/bill-item';
import AccumulationItem from '../../core/accumulation-item';

import './styles.scss';

const bills = [
    {
        billName: 'Основна картка',
        sum: '15683.35',
        billColor: '#C5DCFA',
        billIcon: '',
        type: 'card',
        currency: 'UAH'
    },
    {
        billName: 'Готiвка',
        sum: '533',
        billColor: '#C5F2C7',
        billIcon: '',
        type: 'cash',
        currency: 'UAH'
    },
    {
        billName: 'Банкiвський рахунок',
        currency: 'USD',
        sum: '2300',
        color: '#FBE5C9',
        billIcon: '',
        type: 'accumulation',
        goals: [
            {
                name: "Загальний",
                current_balance: 3000,
                required_balance: 10000,
                color: 'red'
            }
        ]
    },
    {
        billName: 'Інвестиції',
        currency: 'USD',
        sum: '1078',
        color: '#F7E7A1',
        billIcon: '',
        type: 'accumulation'
    }
];

const Bill = () => {
    const dispatch = useDispatch();
    const [billSum, setBillSum] = useState(0);
    const [accumulationSum, setAccumulationSum] = useState(0);
    const [billItems, setBillItems] = useState([]);
    const [accumulationItems, setAccumulationItems] = useState([]);

    const calculateSum = (toCurrency, array) => {
        let sum = 0;
        if(array && array.length) {
            array.forEach(async (item) => {
                if(item.currency === toCurrency)
                    sum += item.sum;
                else {
                    const convertedValue = item.sum * 27.5;
                    console.log(convertedValue)
                    sum += convertedValue;
                }
            });
        }
        return sum;
    };

    useEffect(() => {
        if(bills && bills.length) {
            const newArray = bills.filter((item) => item.type !== 'accumulation');
            let sum = 0;
            newArray.forEach((item) => {
                sum += +item.sum;
            });
            setBillSum(sum);
            setBillItems(newArray);

            const accumulations = bills.filter((item) => item.type === 'accumulation');
            setAccumulationSum(calculateSum('UAH', accumulations));
            setAccumulationItems(accumulations);
        }
    }, [bills]);

    return (
        <div className="bill-wrapper">
            <div className="bill-header">
                <p className="bills-title">Рахунки</p>
                <p className="sum">{billSum} ₴</p>
            </div>
            {billItems.map((item) => (
                <BillItem
                    icon={item.icon}
                    billName={item.billName}
                    billColor={item.billColor}
                    sum={item.sum}
                    currency={item.currency}
                />
            ))}
            <div className="bill-header">
                <p className="bills-title">Накопичення</p>
                <p className="sum">{accumulationSum} ₴ / {(accumulationSum * 0.034).toFixed(2)} $</p>
            </div>
            {accumulationItems.map((item) => (
                <AccumulationItem
                    icon={item.icon}
                    name={item.name}
                    color={item.color}
                    sum={item.sum}
                    currency={item.currency}
                    goals={item.goals}
                />
            ))}
        </div>
    );
};

export default Bill;