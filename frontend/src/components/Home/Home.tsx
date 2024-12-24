// components/Home/Home.tsx
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Sales from './Main/Main';
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
            {/* Default navigation to /home/sales */}
            <Route path="/" element={<Navigate to="home/main" />} />
            <Route path="home/main" element={
              <>
                <Sales />
                <div className="home-bottom">
                </div>
              </>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
