/* In case subcategory is needed */
export interface Category {
    id: string;
    name: string;
    subcategories?: Category[];
  }
  