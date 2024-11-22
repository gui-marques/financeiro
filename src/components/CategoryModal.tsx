import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { Category, Subcategory } from '../types/finance';
import { icons } from '../data/categories';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, 'id'>) => void;
  type: 'income' | 'expense';
}

export function CategoryModal({ isOpen, onClose, onSave, type }: CategoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    icon: 'Plus',
    subcategories: [{ name: '' }],
  });

  if (!isOpen) return null;

  const handleAddSubcategory = () => {
    setFormData({
      ...formData,
      subcategories: [...formData.subcategories, { name: '' }],
    });
  };

  const handleSubcategoryChange = (index: number, value: string) => {
    const newSubcategories = [...formData.subcategories];
    newSubcategories[index] = { name: value };
    setFormData({ ...formData, subcategories: newSubcategories });
  };

  const handleRemoveSubcategory = (index: number) => {
    const newSubcategories = formData.subcategories.filter((_, i) => i !== index);
    setFormData({ ...formData, subcategories: newSubcategories });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subcategories = formData.subcategories
      .filter(sub => sub.name.trim() !== '')
      .map(sub => ({
        name: sub.name,
        id: Math.random().toString(36).substr(2, 9),
        categoryId: Math.random().toString(36).substr(2, 9), // This will be replaced with actual category ID
      }));

    onSave({
      name: formData.name,
      icon: formData.icon,
      type,
      subcategories,
    });
    
    setFormData({ name: '', icon: 'Plus', subcategories: [{ name: '' }] });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nova Categoria</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome da Categoria</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ícone</label>
            <div className="grid grid-cols-6 gap-2">
              {Object.entries(icons).map(([name]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: name })}
                  className={`p-2 rounded-lg ${
                    formData.icon === name
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {React.createElement(icons[name as keyof typeof icons], { size: 20 })}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategorias</label>
            <div className="space-y-2">
              {formData.subcategories.map((subcategory, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={subcategory.name}
                    onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                    placeholder="Nome da subcategoria"
                    className="block w-full"
                  />
                  {formData.subcategories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSubcategory(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSubcategory}
                className="flex items-center text-indigo-600 hover:text-indigo-700"
              >
                <Plus size={20} className="mr-1" />
                Adicionar Subcategoria
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}