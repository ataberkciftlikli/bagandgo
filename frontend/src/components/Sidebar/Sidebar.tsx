// components/Sidebar/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import menuIcon from '../icons/menu.png';
import newsIcon from '../icons/news.png';
import tasksIcon from '../icons/tasks.png';
import messageBoardIcon from '../icons/messageBoard.png';
import calendarIcon from '../icons/calendar.png';
import infoIcon from '../icons/info.png';
import remindersIcon from '../icons/tasks.png';
import starIcon from '../icons/star.png';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onTasksClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar, onTasksClick }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      toggleSidebar();
    }
  }, [isMobile]);

  const isActive = (path: string) => location.pathname === path;
  const isHomeSection = location.pathname.startsWith('/home');

  return (
    <div id="sidebar" className={`sidebar ${isSidebarOpen ? '' : 'collapsed'} ${isMobile ? 'mobile-sidebar' : ''}`}>
      <div className="sidebar-header">
      <button className="menu-button" id="menuButton" onClick={toggleSidebar}>
            <img src={menuIcon} alt="Menu" className="menu-icon" />
          </button>
        {isSidebarOpen && (
          <button className="sidebar-title" onClick={() => (window.location.href = '/')}>
            BagAndGo
          </button>
        )}
      </div>
      <div className="sidebar-links">
        {isHomeSection ? (
          <>
            <Link to="/home/sales" className={`sidebar-link ${isActive('/home/sales') ? 'active' : ''}`}>
              <img src={newsIcon} alt="News" className="sidebar-icon" />
              {isSidebarOpen && <span>Home</span>}
            </Link>
            <Link
              to="/home/tasks"
              className={`sidebar-link ${isActive('/home/tasks') || isActive('/home/admin-tasks') ? 'active' : ''}`}
              onClick={onTasksClick}
            >
              <img src={tasksIcon} alt="Tasks" className="sidebar-icon" />
              {isSidebarOpen && <span>Sales</span>}
            </Link>
            <Link to="/home/message-board" className={`sidebar-link ${isActive('/home/message-board') ? 'active' : ''}`}>
              <img src={messageBoardIcon} alt="Message Board" className="sidebar-icon" />
              {isSidebarOpen && <span>Categories</span>}
            </Link>
            {/*<Link to="/home/calendar" className={`sidebar-link ${isActive('/home/calendar') ? 'active' : ''}`}>
              <img src={calendarIcon} alt="Calendar" className="sidebar-icon" />
              {isSidebarOpen && <span>Sub-Menu-4</span>}
            </Link>*/}
          </>
        ) : (
          <>
            <Link to="/profile/info" className={`sidebar-link ${isActive('/profile/info') ? 'active' : ''}`}>
              <img src={infoIcon} alt="Info" className="sidebar-icon" />
              {isSidebarOpen && <span>Info</span>}
            </Link>
            <Link to="/profile/history" className={`sidebar-link ${isActive('/profile/history') ? 'active' : ''}`}>
              <img src={remindersIcon} alt="History" className="sidebar-icon" />
              {isSidebarOpen && <span>History</span>}
            </Link>
            <Link to="/profile/favorites" className={`sidebar-link ${isActive('/profile/favorites') ? 'active' : ''}`}>
              <img src={starIcon} alt="Star" className="sidebar-icon-star" />
              {isSidebarOpen && <span>Favorites</span>}
            </Link>
          </>
        )}
      </div>

        {/* {isSidebarOpen && (
        <div className="sidebar-name">
          <span>Admin</span>
        </div>
      )}

      <div className="sidebar-social-media">
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" className="social-icon" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="Twitter" className="social-icon" />
        </a>
      </div>*/}
    </div>
  );
};

export default Sidebar;
