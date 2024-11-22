import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Transaction } from '../../types/finance';
import { defaultCategories } from '../../data/categories';

interface SubcategoryBreakdownProps {
  transactions: Transaction[];
}

export function SubcategoryBreakdown({ transactions }: SubcategoryBreakdownProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const categorizedTransactions = transactions.reduce((acc, transaction) => {
    const category = defaultCategories.find(c => c.id === transaction.category);
    if (!category) return acc;

    if (!acc[category.id]) {
      acc[category.id] = {
        name: category.name,
        type: category.type,
        total: 0,
        subcategories: {}
      };
    }

    acc[category.id].total += transaction.amount;

    const subcategoryId = transaction.subcategory;
    const subcategory = category.subcategories.find(s => s.id === subcategoryId);
    if (subcategory) {
      if (!acc[category.id].subcategories[subcategoryId]) {
        acc[category.id].subcategories[subcategoryId] = {
          name: subcategory.name,
          total: 0
        };
      }
      acc[category.id].subcategories[subcategoryId].total += transaction.amount;
    }

    return acc;
  }, {} as Record<string, {
    name: string;
    type: 'income' | 'expense';
    total: number;
    subcategories: Record<string, { name: string; total: number; }>;
  }>);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Detalhamento por Subcategorias</h3>
      <div className="space-y-4">
        {Object.entries(categorizedTransactions).map(([categoryId, category]) => (
          <div key={categoryId} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(categoryId)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-2">
                {expandedCategories.includes(categoryId) ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
                <span className="font-semibold">{category.name}</span>
              </div>
              <span className={`font-bold ${
                category.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {category.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </button>
            
            {expandedCategories.includes(categoryId) && (
              <div className="divide-y">
                {Object.entries(category.subcategories).map(([subId, subcategory]) => (
                  <div
                    key={subId}
                    className="flex justify-between items-center p-3 pl-12 bg-white hover:bg-gray-50"
                  >
                    <span className="text-gray-600">{subcategory.name}</span>
                    <span className={`font-medium ${
                      category.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {subcategory.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}