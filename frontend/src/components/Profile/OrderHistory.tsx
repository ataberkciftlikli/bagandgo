// src/components/Profile/OrderHistory.tsx
import React from 'react';
import './OrderHistory.css';

const OrderHistory: React.FC = () => {
    return (
        <div className="order-history-container">
            <h2>Order History</h2>
            <div className="order-item">
                <p><strong>Product:</strong> Product Name</p>
                <p><strong>Quantity:</strong> 2</p>
                <p><strong>Price:</strong> $100</p>
                <p><strong>Purchase Date:</strong> 2024-10-01</p>
            </div>
        </div>
    );
};

export default OrderHistory;
