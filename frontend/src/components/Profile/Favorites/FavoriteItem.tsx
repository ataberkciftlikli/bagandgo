// components/Profile/Favorites/FavoriteItem.tsx
import React from 'react';
import './favoriteItem.css';

interface FavoriteItemProps {
  item: {
    id: string;
    name: string;
    price: string;
    rating: number;
    reviewCount: number;
    image: string;
  };
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ item }) => {
  return (
    <div className="favorite-item">
      <img src={item.image} alt={item.name} className="favorite-item-image" />
      <div className="favorite-item-details">
        <h3>{item.name}</h3>
        <p>{item.price}</p>
        <div className="favorite-item-rating">
          <span>⭐ {item.rating}</span> ({item.reviewCount} reviews)
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
