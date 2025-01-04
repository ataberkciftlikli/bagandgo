import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import './sales.css';

const Sales: React.FC = () => {
  const [saleProducts, setSaleProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/product/products/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          const discountedProducts = data.filter((product: any) => product.is_discounted);
          setSaleProducts(discountedProducts);
        } else {
          setError('Failed to fetch products.');
        }
      } catch (error) {
        console.error('Error fetching discounted products:', error);
        setError('An error occurred while fetching products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedProducts();
  }, []);

  const handleItemClick = (item: any) => {
    setModalData(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    setQuantity(1); // Reset quantity when closing the modal
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10) || 1);
  };

  const handleAddToCart = async () => {
    if (!modalData || !modalData.id) {
      alert('Invalid product data.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not logged in.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: modalData.id,
          quantity,
          token,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Product added to cart successfully.');
      } else {
        alert(data.error || 'Failed to add product to cart.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleAddToFavorites = async () => {
    if (!modalData || !modalData.id) {
      alert('Invalid product data.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not logged in.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/like-product/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: modalData.id,
          token,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Added to favorites successfully.');
      } else {
        alert(data.error || 'Failed to add to favorites.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading discounted products...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div id="sales-page">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="sales-page-content">
        <h1>DISCOUNTED PRODUCTS</h1>
        <div className="sales-items-container">
          {saleProducts.length === 0 ? (
            <p>No discounted products found.</p>
          ) : (
            saleProducts.map((product) => (
              <div key={product.id} className="sales-item" onClick={() => handleItemClick(product)}>
                <img src={product.image} alt={product.name} className="sales-item-image" />
                <div className="sales-item-details">
                  <h3>{product.name}</h3>
                  <div className="sales-item-prices">
                    <p className="sales-item-old-price">
                      <del>{product.old_price > 0 ? `${product.old_price.toFixed(2)} TL` : ''}</del>
                    </p>
                    <p className="sales-item-new-price">{product.price.toFixed(2)} TL</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && modalData && (
        <div className="modal-overlay-unique">
          <div className="modal-unique">
            <button className="close-button-unique" onClick={closeModal}>
              ×
            </button>
            {modalData.image && (
              <img
                src={modalData.image}
                alt={modalData.name}
                className="product-image-unique"
              />
            )}
            <div className="modal-details-unique">
              <h2>
                {modalData.name}
              </h2>
              <h2>
                <strong>{modalData.price} TL</strong> 
              </h2>
              <p>
                <strong>Stock:</strong> {modalData.stock}
              </p>
              <p>
                <strong>Barcode:</strong> {modalData.barcode}
              </p>
                <div className="quantity-section">
                    <label className="quantity-input"><strong>Quantity:</strong> </label>
                    <input className="quantity-input-area"
                      id="quantity-input"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                </div>
                <button  onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
                <button onClick={handleAddToFavorites} className="remove-from-favorites-button">
                  Add To Favorites
                </button>
              </div>
              
            </div>
          </div>
      )}
    </div>
  );
};

export default Sales;
