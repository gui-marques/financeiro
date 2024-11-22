export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  subcategory: string;
  date: string;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: 'income' | 'expense';
  subcategories: Subcategory[];
}