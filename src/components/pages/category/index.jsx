import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';
import MonthSlider from "../../core/month-slider";
import {getCategories} from "../../../utils/api";
import {Doughnut} from "react-chartjs-2";
import CategoryList from "../../core/category-list";
import AddCategory from "../../core/add-category";
import dayjs from "dayjs";
import allActions from "../../../store/actions";


const createDataset = (data, colors) => {
    return {
        datasets: [{
            data: data,
            backgroundColor: colors,
        }]
    }
};


const defaultDataset = () => {
    return createDataset([1], ['#cccccc']);
}

const itemsDataset = (items) => {
    return createDataset(items.map(item => item.totalByCategory), items.map(item => item.color));
}

const chartOptions = {
    cutout: 105,
    responsive: true,
    maintainAspectRatio: true,
    animation: false,
    plugins: {
        tooltip: {
            enabled: false
        }
    }
}

const Category = ({shown, addExpense}) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    // todo useSelector for categories isUpdateNeeded state
    const [items, setItems] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);

    useEffect(() => {
        dispatch(allActions.expense.removeCategory());
        if (selectedDate) {
            handleCategories(selectedDate.get('month'), selectedDate.get('year')).catch(error => {
                console.log('handled categories by selected date error', error)
            });
        }
    }, [selectedDate, shown]);

    const handleCategories = (month, year) => getCategories({
        token: userData.token,
        month: month + 1,
        year: year
    }).then((data) => {
        console.log('data', data);
        setItems(data.data);
    });

    const calculateTotal = (items) => {
        return items.reduce((accumulator, currentValue) => accumulator + currentValue.totalByCategory, 0);
    }

    return (
        <>
            <AddCategory
                open={isOpenAddCategory}
                onClose={() => {
                    setIsOpenAddCategory(false);
                }}
                onSuccess={() => {
                    handleCategories(dayjs().get('month'), dayjs().get('year'))
                }}
            />
            <div className="category-wrapper">
                <MonthSlider onChange={setSelectedDate}/>
                {items && items.length > 0 ?
                    <div className="chart">
                        <div className="spending">
                            <div className="spending-content">
                                <p>Витрати</p>
                                <p className="total">{calculateTotal(items)} ₴</p>
                            </div>
                        </div>
                        {calculateTotal(items) !== 0 ?
                            <Doughnut data={itemsDataset(items)} options={chartOptions}/> :
                            <Doughnut data={defaultDataset} options={chartOptions}/>
                        }
                    </div> : null}
                <CategoryList data={items} addNew={() => setIsOpenAddCategory(true)}
                              addExpense={addExpense}
                />
            </div>
        </>
    );

};

export default Category;
