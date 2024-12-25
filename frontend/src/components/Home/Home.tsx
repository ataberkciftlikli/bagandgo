// components/Home/Home.tsx
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Main from './Main/Main'; // Main home content
import Sales from './Sales/Sales'; // Sales content
import './home.css';

const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="home-page">
      <Header toggleSidebar={toggleSidebar} />
      <div className="home-container">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`home-main ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
          <Routes>
            {/* Default navigation to home/main */}
            <Route path="/" element={<Navigate to="home/main" />} />
            
            {/* Main Home Page */}
            <Route path="home/main" element={<Main />} />

            {/* Sales Submenu */}
            <Route path="sales" element={<Sales />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
