import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Main from './Main/Main'; // Main home content
import Sales from './Sales/Sales'; // Sales content
import './home.css';

const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const username = localStorage.getItem('username');
    if (!username) {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div id="home-page">
      {showModal && (
  <div className="modal-overlay-home">
    <div className="modal-home">
      <h3>Sign In to access all content!</h3>
      <div className="modal-buttons-home">
        <button
          onClick={() => {
            if (!sessionStorage.getItem('loginPageRefreshed')) {
              sessionStorage.setItem('loginPageRefreshed', 'true');
              navigate('/login');
              window.location.reload(); // Refresh the page after navigating to /login
            } else {
              sessionStorage.removeItem('loginPageRefreshed'); // Remove the item after the first refresh
              navigate('/login');
            }
          }}
          className="sign-in-button-home"
        >
          Sign In
        </button>
        <button onClick={handleCloseModal} className="close-button-home">
          Close
        </button>
      </div>
    </div>
  </div>
)}
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
