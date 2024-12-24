import React from 'react';
import './favoriteItem.css';

interface FavoriteItemProps {
  item: {
    id: string;
    name: string;
    price: number; // Ensure price is a number
    image: string; // Relative URL from the API
  };
}

const BASE_URL = import.meta.env.VITE_BASE_URL; // Fetch the base URL from .env


const FavoriteItem: React.FC<FavoriteItemProps> = ({ item }) => {
  return (
    <div className="favorite-item">
      {/* Prepend BASE_URL to the relative image URL */}
      <img src={`${BASE_URL}${item.image}`} alt={item.name} className="favorite-item-image" />
      <div className="favorite-item-details">
        <h3>{item.name}</h3>
        <p>{item.price} TL</p>
      </div>
    </div>
  );
};

export default FavoriteItem;
