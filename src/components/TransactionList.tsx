import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Trash2 } from 'lucide-react';
import type { Transaction } from '../types/finance';
import { defaultCategories } from '../data/categories';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  const getCategoryName = (categoryId: string) => {
    const category = defaultCategories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getSubcategoryName = (categoryId: string, subcategoryId: string) => {
    const category = defaultCategories.find(c => c.id === categoryId);
    const subcategory = category?.subcategories.find(s => s.id === subcategoryId);
    return subcategory ? subcategory.name : subcategoryId;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Últimas Transações</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              {transaction.type === 'income' ? (
                <ArrowUpCircle className="text-green-600" size={24} />
              ) : (
                <ArrowDownCircle className="text-red-600" size={24} />
              )}
              <div>
                <p className="font-semibold text-gray-800">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {getCategoryName(transaction.category)} &rsaquo; {getSubcategoryName(transaction.category, transaction.subcategory)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className={`font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <button
                onClick={() => onDeleteTransaction(transaction.id)}
                className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                title="Excluir transação"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            Nenhuma transação encontrada
          </div>
        )}
      </div>
    </div>
  );
}