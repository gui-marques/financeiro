import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

interface BalanceCardProps {
  totalBalance: number;
  income: number;
  expenses: number;
}

export function BalanceCard({ totalBalance, income, expenses }: BalanceCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Saldo Total</p>
            <p className="text-2xl font-bold text-gray-800">
              {totalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <Wallet className="text-indigo-600" size={24} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Receitas</p>
            <p className="text-2xl font-bold text-green-600">
              {income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <ArrowUpCircle className="text-green-600" size={24} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Despesas</p>
            <p className="text-2xl font-bold text-red-600">
              {expenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <ArrowDownCircle className="text-red-600" size={24} />
        </div>
      </div>
    </div>
  );
}