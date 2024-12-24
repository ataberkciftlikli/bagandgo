import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import menuIcon from '../icons/menu.png';
import newsIcon from '../icons/news.png';
import tasksIcon from '../icons/tasks.png';
import messageBoardIcon from '../icons/messageBoard.png';
import infoIcon from '../icons/info.png';
import remindersIcon from '../icons/tasks.png';
import starIcon from '../icons/star.png';
import CategoryList from '../Category/CategoryList.tsx';
import { categories } from '../Category/CategoriesData.ts';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onTasksClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar, onTasksClick }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoriesClick = () => {
    setShowCategories((prev) => !prev);
  };

  useEffect(() => {
    if (isMobile) {
      toggleSidebar();
    }
  }, [isMobile]);

  const isActive = (path: string) => location.pathname === path;

  // Adjust logic to include category routes as part of the "home" section.
  const isHomeSection =
    location.pathname.startsWith('/home') || location.pathname.startsWith('/category');

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
            <Link to="/home/main" className={`sidebar-link ${isActive('/home/main') ? 'active' : ''}`}>
              <img src={newsIcon} alt="News" className="sidebar-icon" />
              {isSidebarOpen && <span>Home</span>}
            </Link>
            <Link
              to="/home/sales"
              className={`sidebar-link ${isActive('/home/sales') || isActive('/home/admin-sales') ? 'active' : ''}`}
              onClick={onTasksClick}
            >
              <img src={tasksIcon} alt="Tasks" className="sidebar-icon" />
              {isSidebarOpen && <span>Sales</span>}
            </Link>
            <Link
              to={useLocation().pathname}
              className={`sidebar-link ${isActive('/home/message-board') ? 'active' : ''}`}
              onClick={handleCategoriesClick}
            >
              <img src={messageBoardIcon} alt="Message Board" className="sidebar-icon" />
              {isSidebarOpen && <span>Categories</span>}
            </Link>
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
      {showCategories && <CategoryList categories={categories} />}
    </div>
  );
};

export default Sidebar;
