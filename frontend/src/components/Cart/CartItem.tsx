import React from 'react';
import './cartItem.css';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onAddToFavorites: (productId: number) => void;
  onRemoveFromCart: (productId: number) => void; 
}

const CartItem: React.FC<CartItemProps> = ({ item, onAddToFavorites, onRemoveFromCart }) => {
  const price = item.price ?? 0;
  const quantity = item.quantity ?? 1;

  const handleAddToFavorites = () => {
    onAddToFavorites(item.id);
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart(item.id);
  };

  return (
    <div id="cartItem">
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Price: {price.toFixed(2)} TL</p>
        <p>Quantity: {quantity}</p>
        <p>Total: {(price * quantity).toFixed(2)} TL</p>
        <div className='buttons'>
        <button onClick={handleAddToFavorites} className="add-to-favorites-button">
          Add to Favorites
        </button>
        <button onClick={handleRemoveFromCart} className="remove-from-cart-button">
          Remove from Cart
        </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CartItem;
