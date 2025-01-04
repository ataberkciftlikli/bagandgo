import React, { useState } from 'react';
import ProductItem from './ProductItem';
import QRCode from 'react-qr-code'
import './transactionItem.css';
import receipt from '../../icons/receipt.png';

interface Product {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  price: number; // Price as a number from the API
  old_price: number;
  is_discounted: boolean;
  image: string;
  stock: number;
  barcode: string;
}

interface Transaction {
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
  products: Product[];
  total_price: number;
  confirmation_code: string;
  created_at: string;
}

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleReceiptClick = () => {
    setIsQRModalOpen(true);
  };

  const closeQRModal = () => {
    setIsQRModalOpen(false);
  };

  return (
    <div id="transactionItem">
    <div className="transaction-item">
      <div className="transaction-summary" onClick={toggleExpand}>
        <img src={receipt} alt="Product thumbnail" className="thumbnail" />
        <div>
          <p>
            Receipt No:{' '}
            <strong onClick={handleReceiptClick} className="clickable-receipt">
              {transaction.confirmation_code}
            </strong>
          </p>
          <p>Transaction Completed</p>
          <p>
            <strong>Order Date:</strong>{' '}
            {new Date(transaction.created_at).toLocaleString()}
          </p>
        </div>
        <div>
          <p>Total Amount: {transaction.total_price} TL</p>
        </div>
        <button className="expand-button">{isExpanded ? '▲' : '▼'}</button>
      </div>
      {isExpanded && (
        <div className="product-list">
          {transaction.products.map((product, index) => (
            <ProductItem
              key={index}
              product={{
                ...product,
                price: product.price.toString(), // Convert price to string
              }}
            />
          ))}
        </div>
      )}

      {isQRModalOpen && (
        <div className="modal-overlay-transaction">
          <div className="modal-transaction">
            <button className="close-button-transaction" onClick={closeQRModal}>
              ×
            </button>
            <h2>QR Code for Receipt</h2>
            <QRCode value={transaction.confirmation_code} size={200} />
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default TransactionItem;
