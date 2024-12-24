import './CategoryList.css';
import React from 'react';
import CategoryItem from './CastegoryItem.tsx';
import { Category } from './types.ts';

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div id="category-list">
    <ul className="category-list">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </ul>
    </div>
  );
};

export default CategoryList;
