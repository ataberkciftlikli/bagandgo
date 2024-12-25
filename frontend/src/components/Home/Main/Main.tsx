// components/Sales/Main.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
// Import local images
import hotSaleImage1 from '../../icons/home-1.png';
import hotSaleImage2 from '../../icons/home-2.png';
import hotSaleImage3 from '../../icons/home-3.png';
import otherSaleImage1 from '../../icons/dairy.png';
import otherSaleImage2 from '../../icons/vegetables.jpg';
import otherSaleImage3 from '../../icons/cleaning.png';

const Sales: React.FC = () => {
  const navigate = useNavigate();

  // Separate arrays for hot sale and other sales items
  const hotSaleItems = [
    { title: 'Sales at Snacks category!', date: 'Today', source: 'Our Store', url: '/category/snacks', image: hotSaleImage1 },
    { title: 'Sales at Beverages category!', date: 'Today', source: 'Our Store', url: '/category/beverages', image: hotSaleImage2 },
    { title: 'Sales at Meat category!', date: 'Today', source: 'Our Store', url: '/category/meat-products', image: hotSaleImage3 },
  ];

  const otherSalesItems = [
    { title: 'Dairy Products', date: 'Today', source: 'Our Store', url: '/category/dairy', image: otherSaleImage1 },
    { title: 'Vegetables and Fruits', date: 'Today', source: 'Our Store', url: '/category/vegetables-and-fruits', image: otherSaleImage2 },
    { title: 'Cleaning Products', date: 'Today', source: 'Our Store', url: '/category/cleaning-products', image: otherSaleImage3 },
  ];

  // State to track the current index for hot sale images
  const [currentHotSaleIndex, setCurrentHotSaleIndex] = useState(0);

  // Auto-slide timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHotSaleIndex((prevIndex) => (prevIndex + 1) % hotSaleItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [hotSaleItems.length]);

  const handleNextHotSale = () => {
    setCurrentHotSaleIndex((prevIndex) => (prevIndex + 1) % hotSaleItems.length);
  };

  const handlePreviousHotSale = () => {
    setCurrentHotSaleIndex(
      (prevIndex) => (prevIndex - 1 + hotSaleItems.length) % hotSaleItems.length
    );
  };

  const handleSaleClick = (url: string) => {
    if (url.startsWith('/')) {
      navigate(url); // Use React Router for internal navigation
    } else {
      window.open(url, '_blank'); // Use window.open for external URLs
    }
  };

  return (
    <div id="sales-section" className="sales-section">
      <h2>Sales</h2>
      {hotSaleItems.length > 0 && (
        <div className="hot-sale-container">
          <button className="nav-button left-button" onClick={handlePreviousHotSale}>
            &#10094;
          </button>
          <div
            className="hot-sale"
            onClick={() => handleSaleClick(hotSaleItems[currentHotSaleIndex].url)}
          >
            <img
              src={hotSaleItems[currentHotSaleIndex].image}
              alt="Hot Sale"
              className="hot-sale-image"
            />
            <div className="hot-sale-details">
              <h3>{hotSaleItems[currentHotSaleIndex].title}</h3>
              <p>
                {hotSaleItems[currentHotSaleIndex].date} - {hotSaleItems[currentHotSaleIndex].source}
              </p>
            </div>
          </div>
          <button className="nav-button right-button" onClick={handleNextHotSale}>
            &#10095;
          </button>
        </div>
      )}
      <h2>Other Sales</h2>
      <div className="other-sales-list">
        {otherSalesItems.map((item, index) => (
          <div
            key={index}
            className="other-sales-item"
            onClick={() => handleSaleClick(item.url)}
          >
            <img src={item.image} alt={item.title} className="other-sales-image" />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
