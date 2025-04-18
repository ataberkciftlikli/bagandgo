import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';
import searchIcon from '../icons/search.png'; // Adjust the path if necessary

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState<{ name: string; path: string }[]>([]);
  const [productResults, setProductResults] = useState<any[]>([]); // For product search results
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any | null>(null); // Data to show in the modal
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) {
        setProductResults([]);
        return;
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/product/products/?search=${query}`);
        const data = await response.json();
        if (response.ok) {
          setProductResults(data);
        }
      } catch (error) {
        console.error('Error fetching product search results:', error);
      }
    };

    const debounceTimer = setTimeout(() => fetchProducts(), 300); // Debounce API requests
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);
  };

  const handlePageClick = (path: string) => {
    navigate(path);
    setQuery('');
    setFilteredPages([]);
    setProductResults([]);
  };
  

  const handleProductClick = (product: any) => {
    setModalData(product);
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
      console.error('Error adding to cart:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  const handleAddToFavorites = async () => {
    if (!modalData || !modalData.id) {
      alert("Invalid product data.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/like-product/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: modalData.id,
          token,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Action completed successfully.");
      } else {
        alert(data.error || "Failed to update favorite status.");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    setQuantity(1); // Reset quantity when closing the modal
  };

  return (
    <div id="searchbar">
    <div className="search-bar-container">
      <img src={searchIcon} alt="Search" className="search-icon" />
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      {query && (
        <ul className="search-results">
          {productResults.map((product) => (
            <li
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="search-result-item"
            >
              <span className="product-name">{product.name}</span>
              <span className="product-price">{product.price.toFixed(2)} TL</span>
            </li>
          ))}
        </ul>
      )}

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
    </div>
  );
};

export default SearchBar;
