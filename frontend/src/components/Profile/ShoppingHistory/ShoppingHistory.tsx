// components/Profile/ShoppingHistory/ShoppingHistory.tsx
import React from 'react';
import TransactionItem from './TransactionItem';
import './shoppingHistory.css';

const transactions = [
  { id: '1', date: '03 November 2024', receiptNo: '442 185 017 3', amount: '338,90 TL', products: [{ name: 'Product A', price: '100 TL' }, { name: 'Product B', price: '238,90 TL' }] },
  { id: '2', date: '02 September 2024', receiptNo: '420 535 187 4', amount: '338,89 TL', products: [{ name: 'Product C', price: '99,00 TL' }, { name: 'Product D', price: '113,99 TL' }, { name: 'Product E', price: '125,90 TL' }] },
  { id: '3', date: '21 August 2024', receiptNo: '251 881 534 7', amount: '75,84 TL', products: [{ name: 'Product F', price: '75,84 TL' }] },
  { id: '4', date: '12 August 2024', receiptNo: '651 842 213 4', amount: '423,99 TL', products: [{ name: 'Product A', price: '100 TL' }, { name: 'Product B', price: '238,90 TL' }] },
  { id: '5', date: '24 July 2024', receiptNo: '723 451 431 3', amount: '134,59 TL', products: [{ name: 'Product C', price: '99,00 TL' }, { name: 'Product D', price: '113,99 TL' }, { name: 'Product E', price: '125,90 TL' }] },
  { id: '6', date: '16 June 2024', receiptNo: '147 731 575 2', amount: '634,54 TL', products: [{ name: 'Product F', price: '75,84 TL' }] },
  // Add more transactions here
];

const ShoppingHistory: React.FC = () => {
  return (
    <div id="history-page">
    <div className="shopping-history">
      <h2>Shopping History</h2>
      <div className="transactions">
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ShoppingHistory;
