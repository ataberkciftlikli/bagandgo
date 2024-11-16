// components/Header/Header.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';
import exit_logo from '../icons/exit_logo.png';
import user from '../icons/user2.png';
import cart from '../icons/cart.png'; // Adjust the path if needed
import code from '../icons/code.png'; // Adjust the path if needed
import info from '../icons/info.png'; // Adjust the path if needed
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
          <button className="header-title" onClick={() => navigate('/')}>
            BagAndGo
          </button>
          <button onClick={handleExitClick} className="exit-button-mobile">
            <img src={exit_logo} alt="Exit" className="exit-icon-mobile" />
          </button>
        </div>
        <div className="navbar2">
          <SearchBar />
          <div className="guest-links">
            <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
              <img src={info} alt="info Icon" className="info" /> Profile
            </Link>
            <Link to="/code" className={`nav-link ${isActive('/code') ? 'active' : ''}`}>
              <img src={code} alt="Cart Icon" className="code" /> Scan QR Code
            </Link>

            <Link to="/cart" className={`nav-link ${isActive('/cart') ? 'active' : ''}`}>
              <img src={cart} alt="Cart Icon" className="cart" /> Cart
            </Link>
            <Link to="/user" className={`nav-link ${isActive('/user') ? 'active' : ''}`}>
              <img src={user} alt="Cart Icon" className="exit-icon" /> User
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
