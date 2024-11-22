import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BalanceCard } from './components/BalanceCard';
import { TransactionList } from './components/TransactionList';
import { AddTransactionForm } from './components/AddTransactionForm';
import { Reports } from './components/Reports';
import type { Transaction, Category } from './types/finance';
import * as api from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports'>('dashboard');
  const [customCategories, setCustomCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [transactionsData, categoriesData] = await Promise.all([
        api.getTransactions(),
        api.getCustomCategories()
      ]);
      
      setTransactions(transactionsData);
      setCustomCategories(categoriesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
  }, 0);

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddTransaction = async (newTransaction: Omit<Transaction, 'id'>) => {
    try {
      const transaction = await api.addTransaction(newTransaction);
      setTransactions([transaction, ...transactions]);
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const success = await api.deleteTransaction(id);
      if (success) {
        setTransactions(transactions.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
    }
  };

  const handleAddCategory = async (newCategory: Omit<Category, 'id'>) => {
    try {
      const category = await api.addCategory(newCategory);
      setCustomCategories([...customCategories, category]);
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Painel
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'reports'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Relatórios
          </button>
        </div>

        {activeTab === 'dashboard' ? (
          <>
            <BalanceCard
              totalBalance={totalBalance}
              income={income}
              expenses={expenses}
            />
            <AddTransactionForm 
              onAddTransaction={handleAddTransaction}
              onAddCategory={handleAddCategory}
              customCategories={customCategories}
            />
            <TransactionList 
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </>
        ) : (
          <Reports transactions={transactions} />
        )}
      </main>
    </div>
  );
}

export default App;