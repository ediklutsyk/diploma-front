import React from "react";
import Icon from "../icon";


const CategoryItem = ({
                          icon,
                          name,
                          color,
                          percent,
                          total
                      }) => {
    return (
        <div className="category-item-box">
            <div className="left-row">
                <Icon icon={icon} color={color}/>
                <div className="info-box">
                    <div className="category-bill">
                        <p className="category-name">{name}</p>
                    </div>
                    <p className="percent">{percent}</p>
                    <p className="total">{total} ₴</p>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;