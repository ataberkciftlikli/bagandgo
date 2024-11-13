// components/Sales/Sales.tsx
import React from 'react';
import './sales.css';
// Import local images
import hotSaleImage from '../../icons/Slide_Placeholder.png';
import otherSaleImage1 from '../../icons/Slide_Placeholder.png';
import otherSaleImage2 from '../../icons/Slide_Placeholder.png';
import otherSaleImage3 from '../../icons/Slide_Placeholder.png';

const Sales: React.FC = () => {
  // Sales items array with local images
  const salesItems = [
    { title: 'Hot Sale Item', date: 'Today', source: 'Our Store', url: '#', image: hotSaleImage },
    { title: 'Other Sale Item 1', date: 'Today', source: 'Our Store', url: '#', image: otherSaleImage1 },
    { title: 'Other Sale Item 2', date: 'Today', source: 'Our Store', url: '#', image: otherSaleImage2 },
    { title: 'Other Sale Item 3', date: 'Today', source: 'Our Store', url: '#', image: otherSaleImage3 },
  ];

  const handleSaleClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div id="sales-section" className="sales-section">
      <h2>Sales</h2>
      {salesItems.length > 0 && (
        <div
          className="hot-sale"
          onClick={() => handleSaleClick(salesItems[0].url)}
        >
          <img
            src={salesItems[0].image}
            alt="Hot Sale"
            className="hot-sale-image"
          />
          <div className="hot-sale-details">
            <h3>{salesItems[0].title}</h3>
            <p>{salesItems[0].date} - {salesItems[0].source}</p>
          </div>
        </div>
      )}
      <h2>Other Sales</h2>
      <div className="other-sales-list">
        {salesItems.slice(1).map((item, index) => (
          <div
            key={index}
            className="other-sales-item"
            onClick={() => handleSaleClick(item.url)}
          >
            <img
              src={item.image}
              alt="Other Sale"
              className="other-sales-image"
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
