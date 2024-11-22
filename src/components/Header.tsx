import React from 'react';
import { Wallet } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-indigo-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wallet size={32} />
          <h1 className="text-2xl font-bold">FinanceFlow</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#dashboard" className="hover:text-indigo-200 transition-colors">Painel</a>
          <a href="#transactions" className="hover:text-indigo-200 transition-colors">Transações</a>
          <a href="#reports" className="hover:text-indigo-200 transition-colors">Relatórios</a>
        </nav>
      </div>
    </header>
  );
}