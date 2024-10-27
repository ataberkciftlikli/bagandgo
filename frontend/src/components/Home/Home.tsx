// components/Home/Home.tsx
import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './home.css';

const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="home-page">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        <div className="placeholder-content">
          <h1>Welcome to the Home Page</h1>
          <p>This is a placeholder text area for the homepage content.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

