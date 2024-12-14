import './CategoryList.css';
import React from 'react';
import CategoryItem from './CategoryItem.tsx';
import { Category } from './types.ts';

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <ul className="category-list">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </ul>
  );
};

export default CategoryList;
