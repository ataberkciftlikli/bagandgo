import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import CategoryItem from './CategoryItem'; 
import './CategoryPage.css';
import { categories } from './CategoriesData';

const CategoryPage: React.FC = () => {
  const { slug } = useParams();
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/product/products/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          // Match the category based on slug
          const category = categories.find((cat) => cat.slug === slug);
          if (category) {
            const filteredProducts = data.filter(
              (product: any) => product.category.name.toLowerCase().replace(/\s+/g, '-') === slug
            );
            setCategoryProducts(filteredProducts);
          } else {
            setError('Category not found.');
          }
        } else {
          setError(data.error || 'Failed to fetch category products.');
        }
      } catch (error) {
        console.error('Error fetching category products:', error);
        setError('An error occurred while fetching category products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

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

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    setQuantity(1);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div id="category-page">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="category-page-content">
        <h1>{slug?.replace(/-/g, ' ').toUpperCase()}</h1>
        <div className="category-items-container">
          {categoryProducts.length === 0 ? (
            <p>No products found for this category.</p>
          ) : (
            categoryProducts.map((product) => (
              <div key={product.id} onClick={() => handleItemClick(product)}>
                <CategoryItem item={product} />
              </div>
            ))
          )}
        </div>
      </div>

      {modalOpen && modalData && (
  <div className="modal-overlay-category">
    <div className="modal-category">
      <button className="close-button-category" onClick={closeModal}>
        ×
      </button>
      <img
        src={modalData.image}
        alt={modalData.name}
        className="product-image-category"
      />
      <div className="modal-details-category">
     
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
          <label className="quantity-input">
            <strong>Quantity:</strong>
          </label>
          <input
            className="quantity-input-area"
            id="quantity-input"
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
        <button
          onClick={handleAddToFavorites}
          className="add-to-favorites-button"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default CategoryPage;
