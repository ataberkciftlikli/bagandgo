import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import './cartPage.css';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not logged in. Please log in to view your cart.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/view/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        const validItems = data.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: `${import.meta.env.VITE_BASE_URL}${item.product.image}`,
        }));

        setCartItems(validItems);

        const total = validItems.reduce(
          (sum: number, item: any) => sum + item.price * item.quantity,
          0
        );
        setTotalAmount(total);
      } else {
        setError(data.error || 'Failed to fetch cart items.');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('An error occurred while fetching cart items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not logged in. Please log in to view your profile.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserBalance(data.balance);
      } else {
        setError(data.error || 'Failed to fetch user profile.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('An error occurred while fetching user profile. Please try again.');
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not logged in.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/checkout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Order placed successfully.');
        setCheckoutModalOpen(false); // Close modal
        await fetchCartItems(); // Refresh cart items after checkout
        await fetchUserProfile();
        setCartItems([]); 
        setTotalAmount(0); // Reset the total amount

        navigate('/profile/history'); // Redirect to the order history page
      } else {
        alert(data.error || 'Failed to place the order.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleAddToFavorites = async (productId: number) => {
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
          product_id: productId,
          token,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Action completed successfully.');
      } else {
        alert(data.error || 'Failed to update favorite status.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not logged in.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/remove/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          product_id: productId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Item removed from cart successfully.');
        fetchCartItems(); // Refresh cart items after removal
      } else {
        alert(data.error || 'Failed to remove item from cart.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Loading your cart...</p>;
  }

  return (
    <div id="cart-page">
      <Header toggleSidebar={toggleSidebar} />
      <h1>My Cart</h1>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="cart-main">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onAddToFavorites={handleAddToFavorites}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))
          )}
        </div>
        <div className="cart-summary-container">
          <div className="balance-info">
            <h3>My Balance: {userBalance.toFixed(2)} TL</h3>
          </div>
          <CartSummary totalAmount={totalAmount} onCheckout={() => setCheckoutModalOpen(true)} />
        </div>
      </div>

      {checkoutModalOpen && (
        <div className="modal-overlay-unique">
          <div className="modal-unique">
            <h2>Checkout</h2>
            <p>My Balance: {userBalance.toFixed(2)} TL</p>
            <p>Subtotal: {totalAmount.toFixed(2)} TL</p>
            {userBalance >= totalAmount ? (
              <p>Remaining Balance: {(userBalance - totalAmount).toFixed(2)} TL</p>
            ) : (
              <p style={{ color: 'red' }}>You don't have enough balance! Please use the ATM.</p>
            )}
            <div className="modal-buttons">
            <button
                className="modal-button-green"
                onClick={handleCheckout}
                disabled={userBalance < totalAmount}
              >
                Finish payment
              </button>
              <button
                className="modal-button-red"
                onClick={() => setCheckoutModalOpen(false)}
              >
                Go back to shopping
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
