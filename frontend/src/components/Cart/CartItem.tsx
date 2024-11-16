// components/Cart/CartItem.tsx
import React from 'react';
import './cartItem.css';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div id='cartItem' className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h2>{item.name}</h2>
        <p>Add to Favorties</p>
        <p>Delete</p>
      </div>
      <div className="cart-item-price">
        <p>{item.price.toFixed(2)} TL</p>
      </div>
      <div className="cart-item-quantity">
        <button>-</button>
        <span>{item.quantity}</span>
        <button>+</button>
      </div>
    </div>
  );
};

export default CartItem;
