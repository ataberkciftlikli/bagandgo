// src/components/Profile/Profile.tsx
import React from 'react';
import UserInfo from './UserInfo';
import StorePreferences from './StorePreferences';
import './Profile.css';

const Profile: React.FC = () => {
    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <UserInfo />
            <StorePreferences />
        </div>
    );
};

export default Profile;
