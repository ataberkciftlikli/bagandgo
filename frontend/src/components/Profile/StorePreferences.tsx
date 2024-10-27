// src/components/Profile/StorePreferences.tsx
import React from 'react';
import './StorePreferences.css';

const StorePreferences: React.FC = () => {
    return (
        <div className="store-preferences-container">
            <h2>Store Preferences</h2>
            <p><strong>Favorite Stores:</strong> Store A, Store B</p>
            <p><strong>Default Store:</strong> Store A</p>
        </div>
    );
};

export default StorePreferences;
