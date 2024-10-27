// src/components/Profile/UserInfo.tsx
import React from 'react';
import './UserInfo.css';

const UserInfo: React.FC = () => {
    return (
        <div className="user-info-container">
            <img src="profile-picture-url" alt="Profile" className="profile-picture" />
            <div className="user-info-details">
                <p><strong>First Name:</strong> John</p>
                <p><strong>Last Name:</strong> Doe</p>
                <p><strong>Email:</strong> john.doe@example.com</p>
                <p><strong>Phone:</strong> +1 123 456 7890</p>
                <button className="edit-button">Edit Information</button>
            </div>
        </div>
    );
};

export default UserInfo;
