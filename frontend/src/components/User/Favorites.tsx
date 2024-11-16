// src/components/Profile/Favorites.tsx
import React from 'react';
import './Favorites.css';

const Favorites: React.FC = () => {
    return (
        <div className="favorites-container">
            <h2>Favorites</h2>
            <div className="favorite-item">
                <p><strong>Product Name:</strong> Sample Product</p>
                <p><strong>Price:</strong> $50</p>
            </div>
        </div>
    );
};

export default Favorites;
