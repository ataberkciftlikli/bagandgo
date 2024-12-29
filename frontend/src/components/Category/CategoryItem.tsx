import React from 'react';
import './categoryItem.css';

interface CategoryItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
  return (
    <div id="categoryItem">
    <div className="category-item">
      <img src={item.image} alt={item.name} className="category-item-image" />
      <div className="category-item-details">
        <h3>{item.name}</h3>
        <p>{item.price} TL</p>
      </div>
    </div>
    </div>
  );
};

export default CategoryItem;
