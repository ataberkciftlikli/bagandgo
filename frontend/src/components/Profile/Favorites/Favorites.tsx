import React, { useEffect, useState } from 'react';
import FavoriteItem from './FavoriteItem';
import './favorites.css';

const Favorites: React.FC = () => {
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('User not logged in. Please log in to view liked products.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(import.meta.env.VITE_LIKED_PRODUCTS_API_URL as string, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setFavoriteItems(data);
        } else {
          setError(data.error || 'Failed to fetch liked products.');
        }
      } catch (error) {
        console.error('Error fetching liked products:', error);
        setError('An error occurred while fetching liked products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, []);

  const handleItemClick = (item: any) => {
    setModalData(item);
    setModalOpen(true);
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

  const handleRemoveFromFavorites = async () => {
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
        alert(data.message || 'Action completed successfully.');
        // Refresh the favorites list after removal
        setFavoriteItems((prevItems) =>
          prevItems.filter((item) => item.id !== modalData.id)
        );
        closeModal();
      } else {
        alert(data.error || 'Failed to update favorite status.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    setQuantity(1); // Reset quantity when closing the modal
  };

  if (loading) {
    return <p>Loading your favorite products...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div id="favorites-section" className="favorites-section">
      <div className="favorites-container">
        <h2>Favorites</h2>
        <div className="favorites-list">
          {favoriteItems.map((item) => (
            <div key={item.id} onClick={() => handleItemClick(item)}>
              <FavoriteItem item={item} />
            </div>
          ))}
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
                src={`${import.meta.env.VITE_BASE_URL}${modalData.image}`}
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
                <button onClick={handleRemoveFromFavorites} className="remove-from-favorites-button">
                  Remove from Favorites
                </button>
              </div>
              
            </div>
          </div>
      )}
    </div>
  );
};

export default Favorites;
