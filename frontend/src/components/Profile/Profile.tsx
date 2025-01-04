import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserInfo from './UserInfo';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import ShoppingHistory from './ShoppingHistory/ShoppingHistory';
import Favorites from './Favorites/Favorites';
import './Profile.css';

const Profile: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div id="profile-page">
          <Header toggleSidebar={toggleSidebar} />
            <div className="profile-container">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`profile-main ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
                <Routes>
                    <Route path="/" element={<Navigate to="info" />} />
                    <Route path="info" element={<UserInfo />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="history" element={<ShoppingHistory />} /> {/* New route */}
                </Routes>
            </div>
            </div>
        </div>
    );
};

export default Profile;
