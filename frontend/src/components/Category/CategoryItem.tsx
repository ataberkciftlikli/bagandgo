import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from './types.ts';

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <li className="category-item">
      <Link to={`/category/${category.slug}`} className="category-link">
        {category.name}
      </Link>
    </li>
  );
};

export default CategoryItem;
