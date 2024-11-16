// components/Profile/ShoppingHistory/TransactionItem.tsx
import React, { useState } from 'react';
import ProductItem from './ProductItem';
import './transactionItem.css';
import receipt from '../../icons/receipt.png';

interface Product {
  name: string;
  price: string;
}

interface Transaction {
  id: string;
  date: string;
  receiptNo: string;
  amount: string;
  products: Product[];
}

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="transaction-item">
      <div className="transaction-summary" onClick={toggleExpand}>
        <img src={receipt} alt="Product thumbnail" className="thumbnail" />
        <div>
          <p>Receipt No: <strong>{transaction.receiptNo}</strong></p>
          <p>Transaction Completed</p>
        </div>
        <div>
          <p>{transaction.date}</p>
          <p className="amount">{transaction.amount}</p>
        </div>
        <button className="expand-button">{isExpanded ? '▲' : '▼'}</button>
      </div>
      {isExpanded && (
        <div className="product-list">
          {transaction.products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
