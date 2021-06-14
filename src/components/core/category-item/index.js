import React from "react";
import Icon from "../icon";
import './styles.scss';


const CategoryItem = ({
                          icon,
                          name,
                          color,
                          percent,
                          total
                      }) => {
    return (
        <div className="category-item-box">
            <Icon icon={icon} color={color}/>
            <div className="content">
                <div className="category-name">
                    <p className="name">{name}</p>
                </div>
                <div className="price">
                    <p className="percent" style={{color: color}}>{percent} % /</p>
                    <p className="total">{total} ₴</p>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;