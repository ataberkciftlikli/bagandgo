// components/Cart/CartPage.tsx
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import './cartPage.css';
import tadim from '../icons/tadim.jpg';
import gazoz from '../../icons/gazoz.jpg';
import tadim2 from '../../icons/tadim2.jpg';
import sens from '../icons/sens.jpg';
import ariel from '../../icons/ariel.jpg';
import omo from '../icons/omo.jpg';
import filiz from '../../icons/filiz.jpg';
import nesfit from '../../icons/nesfit.jpg';
import borek from '../../icons/borek.jpg';
import kodak from '../icons/kodak.jpg';
// Dummy data for cart items
const cartItems = [
  {
    id: '1',
    name: 'Kodak Çinko Karbon Kalem Pil Blister Aa 4\'lü',
    price: 42.95,
    quantity: 1,
    image: kodak,
  },
  {
    id: '2',
    name: 'Omo Express Fresh Kötü Koku Karşıtı 1.480 Ml',
    price: 249.95,
    quantity: 1,
    image: omo,
  },
  {
    id: '3',
    name: 'Sensodyne Çok Yönlü Koruma + Geliştirilmiş Beyaz Diş Macunu 50Ml',
    price: 149.95,
    quantity: 1,
    image: sens,
  },
  {
    id: '4',
    name: 'Tadım Kavrulmuş Siyah Ayçekirdeği 180 G',
    price: 32.95,
    quantity: 1,
    image: tadim,
  },
];

const CartPage: React.FC = () => {
  // Calculate total amount for CartSummary
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="cart-page">
      <Header toggleSidebar={toggleSidebar} />


      <h1>Sepetim</h1>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="cart-main">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary-container">
            <CartSummary totalAmount={totalAmount} />
          </div>
        
      </div>
    </div>
  );
};

export default CartPage;
