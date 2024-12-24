import React, { useState, useEffect } from 'react';
import TransactionItem from './TransactionItem';
import './shoppingHistory.css';

const ShoppingHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token'); // Retrieve the user token from localStorage

      if (!token) {
        setError('User not logged in. Please log in to view shopping history.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          // Sort transactions by `created_at` in descending order (newest first)
          const sortedData = data.sort(
            (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setTransactions(sortedData);
        } else {
          setError(data.error || 'Failed to fetch shopping history.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('An error occurred while fetching shopping history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading your shopping history...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="history-page">
      <div className="shopping-history">
        <h2>Shopping History</h2>
        <div className="transactions">
          {transactions.map((transaction: any) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingHistory;
