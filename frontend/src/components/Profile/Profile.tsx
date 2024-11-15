import React from 'react';
import UserInfo from './UserInfo';
import OrderHistory from './OrderHistory';
import Favorites from './Favorites';
import Balance from './Balance';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import HelpCenter from './HelpCenter';
import './Profile.css';

const Profile: React.FC = () => {
    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <UserInfo />
            <OrderHistory />
            <Favorites />
            <Balance />
            <NotificationSettings />
            <PrivacySettings />
            <HelpCenter />
        </div>
    );
};

export default Profile;
