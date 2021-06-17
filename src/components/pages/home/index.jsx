import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';

import './styles.scss';
import allActions from "../../../store/actions";
import Icon from "../../core/icon";
import {getOperations, getTemplates, newOperation} from "../../../utils/api";
import OperationList from "../../core/operation-list";
import dayjs from "dayjs";

const Home = ({shown, addExpense}) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user)
    const [items, setItems] = useState([]);
    const [templates, setTemplates] = useState([])

    useEffect(() => {
        dispatch(allActions.expense.removeCategory());
        getTemplates({
            token: userData.token
        }).then(data => {
            console.log(data.data)
            setTemplates(data.data)
        })
        getOperations({
            token: userData.token,
            month: dayjs().get('month') + 1,
            year: dayjs().get('year')
        }).then((data) => {
            console.log('data', data);
            setItems(groupByDates(data.data));
        })
    }, [shown])

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

    const handleTemplate = (template) => {
        newOperation({
            token: userData.token,
            data: {
                amount: template.amount,
                category_id: template.category_id,
                bill_id: template.bill_id,
                type: 'spend',
                description: template.name
            }
        }).then(r => {
            console.log('Operations created', r)
        })
    }

    return (
        <>
            <div className="home-wrapper">
                <div className="buttons">
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#FAA09E',
                            color: '#373737'
                        }}
                        onClick={() => {
                            addExpense({isOpen: true});
                        }}>
                        Додати Витрату
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#8CE590',
                            color: '#373737',
                        }}
                        onClick={() => {
                            addExpense({isOpen: true});
                        }}>
                        Додати Дохід
                    </Button>
                </div>
                <div className="templates">
                    <p className={'title'}>Шаблони</p>
                    <div className="category-item-box">
                        {templates && templates.length ? templates.map(template => {
                            return (
                                <div className="template" onClick={() => {
                                    handleTemplate(template)
                                }}>
                                    <Icon icon={template.categoryIcon} color={template.categoryColor}/>
                                    <p>{template.name}</p>
                                </div>)
                        }) : null}
                        <div className={'addNew'} onClick={() => {
                            addExpense({isOpen: true, modalType: 'template'});
                        }}>
                            <Icon icon={'add.svg'} color={'#727272'}/>
                        </div>
                    </div>
                </div>
                <div className="histories">
                    <p className={'title'}>Історія</p>
                    {items && items.length ? items.map(el => (
                        <OperationList data={el.data} sum={el.sum} date={el.date}/>
                    )) : null}
                </div>
            </div>
        </>
    );
};

export default Home;