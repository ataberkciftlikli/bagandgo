// components/SearchBar/SearchBar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';
import searchIcon from '../icons/search.png'; // Adjust the path if necessary

const subPages = [
  { name: 'Home News', path: '/home/news' },
  { name: 'Home Tasks', path: '/home/tasks' },
  { name: 'Home Done Tasks', path: '/home/done-tasks' },
  { name: 'Home Person List', path: '/home/person-list' },
  { name: 'Profile Info', path: '/profile/info' },
  { name: 'Profile Reminders', path: '/profile/reminders' },
  { name: 'Contact', path: '/contact' },
  { name: 'About Us', path: '/about' },
  { name: 'Message Board', path: '/home/message-board' },
];

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState(subPages);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    const filtered = input
      ? subPages.filter((page) =>
          page.name.toLowerCase().includes(input.toLowerCase())
        )
      : subPages;

    setFilteredPages(filtered);
  };

  const handlePageClick = (path: string) => {
    navigate(path);
    setQuery('');
    setFilteredPages(subPages);
  };

  return (
    
    <div className="search-bar-container">
      <img src={searchIcon} alt="Search" className="search-icon" />
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && filteredPages.length > 0) {
            handlePageClick(filteredPages[0].path); // Navigate to the first filtered result on Enter
          }
        }}
        className="search-input"
      />
      {query && (
        <ul className="search-results">
          {filteredPages.map((page) => (
            <li
              key={page.path}
              onClick={() => handlePageClick(page.path)}
              className="search-result-item"
            >
              {page.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
