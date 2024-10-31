import React from 'react';
import UserInfo from './UserInfo';
import StorePreferences from './StorePreferences';
import OrderHistory from './OrderHistory';
import Favorites from './Favorites';
import './Profile.css';

const Profile: React.FC = () => {
    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <UserInfo />
            <StorePreferences />
            <OrderHistory />
            <Favorites />
        </div>
    );
};

export default Profile;
