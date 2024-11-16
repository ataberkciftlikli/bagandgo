// components/Sales/Sales.tsx
import React, { useState } from 'react';
import './sales.css';
// Import local images
import hotSaleImage1 from '../../icons/Slide_Placeholder.png';
import hotSaleImage2 from '../../icons/Slide_Placeholder.png';
import hotSaleImage3 from '../../icons/Slide_Placeholder.png';
import otherSaleImage1 from '../../icons/tech.jpg';
import otherSaleImage2 from '../../icons/food.png';
import otherSaleImage3 from '../../icons/cleaning.png';

const Sales: React.FC = () => {
  // Separate arrays for hot sale and other sales items
  const hotSaleItems = [
    { title: 'Great Sales at our shop!', date: 'Today', source: 'Our Store', url: '#', image: hotSaleImage1 },
    { title: 'Hot Sale Image 2', date: 'Today', source: 'Our Store', url: '#', image: hotSaleImage2 },
    { title: 'Hot Sale Image 3', date: 'Today', source: 'Our Store', url: '#', image: hotSaleImage3 },
  ];

  const otherSalesItems = [
    { title: 'Other Sale Item 1', date: 'Today', source: 'Our Store', url: '#', image: otherSaleImage1 },
    { title: 'Other Sale Item 2', date: 'Today', source: 'Our Store', url: '#', image: otherSaleImage2 },
    { title: 'Other Sale Item 3', date: 'Today', source: 'Our Store', url: '#', image: otherSaleImage3 },
  ];

  // State to track the current index for hot sale images
  const [currentHotSaleIndex, setCurrentHotSaleIndex] = useState(0);

  // Functions to handle navigation for hot sale images
  const handleNextHotSale = () => {
    setCurrentHotSaleIndex((prevIndex) => (prevIndex + 1) % hotSaleItems.length);
  };

  const handlePreviousHotSale = () => {
    setCurrentHotSaleIndex(
      (prevIndex) => (prevIndex - 1 + hotSaleItems.length) % hotSaleItems.length
    );
  };

  const handleSaleClick = (url: string) => {
    window.open(url, '_blank');
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
            <img src={item.image} alt="Other Sale" className="other-sales-image" />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
