// components/Cart/CartSummary.tsx
import React from 'react';
import './cartSummary.css';

interface CartSummaryProps {
  totalAmount: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalAmount }) => {
  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      <p>Total Amount: <strong>{totalAmount.toFixed(2)} TL</strong></p>
      <p>App Charge: <del>19,99 TL</del> <span>Free</span></p>
      <h3>Subtotal: <strong>{totalAmount.toFixed(2)} TL</strong></h3>
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
};

export default CartSummary;
