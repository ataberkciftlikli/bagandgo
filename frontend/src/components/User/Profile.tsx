import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import OrderHistory from './OrderHistory';
import Favorites from './Favorites';
import Balance from './Balance';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import HelpCenter from './HelpCenter';
import './Profile.css';

const Profile: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div id ="user">
            <Header toggleSidebar={toggleSidebar} />
        <div className="profile-container">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <h1>User Profile</h1>

            <OrderHistory />
            <Favorites />
            <Balance />
            <NotificationSettings />
            <PrivacySettings />
            <HelpCenter />
        </div>
        </div>
    );
};


export default Profile;
