import React, { useState } from 'react';
import { Category } from './types.ts';

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="category-item">
      <div className="category-header" onClick={toggleExpand}>
        {category.name}
        {category.subcategories && (
          <span className="toggle-icon"></span>
        )}
      </div>
      {isExpanded && category.subcategories && (
        <ul className="subcategory-list">
          {category.subcategories.map((sub) => (
            <CategoryItem key={sub.id} category={sub} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryItem;
