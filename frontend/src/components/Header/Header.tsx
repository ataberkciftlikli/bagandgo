// components/Header/Header.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';
import exit_logo from '../icons/exit_logo.png';
import menuIcon from '../icons/menu.png';
import SearchBar from '../Searchbar/SearchBar';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleExitClick = () => {
    // Redirect to the login page as a placeholder for the sign-out functionality
    navigate('/login');
    window.location.reload();
  };

  return (
    <header id="header" className="header p-3">
      <div className="general">
        <div className="d-flex align-items-center">
          <button className="menu-button" id="menuButton" onClick={toggleSidebar}>
            <img src={menuIcon} alt="Menu" className="menu-icon" />
          </button>
          <button className="header-title" onClick={() => navigate('/home')}>
            BagAndGo
          </button>
          <button onClick={handleExitClick} className="exit-button-mobile">
            <img src={exit_logo} alt="Exit" className="exit-icon-mobile" />
          </button>
        </div>
        <div className="navbar2">
          <SearchBar />
          <div className="guest-links">
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
              About Us
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
              Contact
            </Link>
            {/* <button
              className={`nav-link ${isActive('/login') ? 'active' : ''}`}
              onClick={() => {
                if (!sessionStorage.getItem('loginPageRefreshed')) {
                  sessionStorage.setItem('loginPageRefreshed', 'true');
                  navigate('/login');
                  window.location.reload();
                } else {
                  sessionStorage.removeItem('loginPageRefreshed');
                  navigate('/login');
                }
              }}
            >
              Sign In
            </button> */}
          </div>
        </div>
        <div className="user-info">
          {/* Placeholder for user info */}
          <span className="user-name">User Info Placeholder</span>
          <button onClick={handleExitClick} className="exit-button d-flex align-items-center">
            <img src={exit_logo} alt="Exit" className="exit-icon" />
            <span className="ml-1">Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
