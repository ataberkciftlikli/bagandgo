import React from 'react';
import { useParams } from 'react-router-dom';
import { categories } from './CategoriesData.ts';

const CategoryPage: React.FC = () => {
  const { slug } = useParams();

  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return <h1>Category not found</h1>;
  }

  return (
    <div>
      {category.name}
    </div>
  );
};

export default CategoryPage;
