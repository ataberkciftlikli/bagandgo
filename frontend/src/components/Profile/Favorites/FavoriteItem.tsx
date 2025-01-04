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
    <div id="favoriteItem">
      <div className="favorite-item">
        {/* Image Section */}
        <img
          src={`${BASE_URL}${item.image}`}
          alt={item.name}
          className="favorite-item-image"
        />
        {/* Details Section */}
        <div className="favorite-item-details">
          <h3>{item.name}</h3>
          <p className="favorite-item-price">{item.price} TL</p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
