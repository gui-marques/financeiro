import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Transaction, Category } from '../types/finance';
import { CategoryModal } from './CategoryModal';
import { defaultCategories, icons } from '../data/categories';

interface AddTransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  customCategories: Category[];
}

export function AddTransactionForm({ 
  onAddTransaction, 
  onAddCategory,
  customCategories 
}: AddTransactionFormProps) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    subcategory: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction({
      ...formData,
      amount: Number(formData.amount),
      type: formData.type as 'income' | 'expense'
    });
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: '',
      subcategory: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const allCategories = [...defaultCategories, ...customCategories];
  const availableCategories = allCategories.filter(
    cat => cat.type === formData.type
  );

  const selectedCategory = availableCategories.find(cat => cat.id === formData.category);
  const availableSubcategories = selectedCategory?.subcategories || [];

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Nova Transação</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valor</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="mt-1 block w-full"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  type: e.target.value as 'income' | 'expense',
                  category: '',
                  subcategory: ''
                })}
                className="mt-1 block w-full"
              >
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoria</label>
              <div className="mt-1 flex space-x-2">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    category: e.target.value,
                    subcategory: ''
                  })}
                  className="block w-full"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {availableCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategoria</label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="mt-1 block w-full"
                required
                disabled={!formData.category}
              >
                <option value="">Selecione uma subcategoria</option>
                {availableSubcategories.map((subcat) => (
                  <option key={subcat.id} value={subcat.id}>
                    {subcat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Adicionar Transação
            </button>
          </div>
        </form>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onAddCategory}
        type={formData.type as 'income' | 'expense'}
      />
    </>
  );
}