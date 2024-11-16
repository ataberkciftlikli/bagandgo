// components/Profile/ShoppingHistory/ProductItem.tsx
import React from 'react';
import './productItem.css';

interface Product {
  name: string;
  price: string;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="product-item">
      <p>{product.name}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductItem;
