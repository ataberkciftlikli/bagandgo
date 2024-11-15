// src/components/Profile/Balance.tsx
import React from 'react';
import './Balance.css';

const Balance: React.FC = () => {
    return (
        <div className="balance-container">
            <h2>Balance</h2>
            <p><strong>Current Balance:</strong> $150.00</p>
        </div>
    );
};

export default Balance;
