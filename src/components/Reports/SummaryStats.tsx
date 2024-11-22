import React from 'react';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import type { Transaction } from '../../types/finance';

interface SummaryStatsProps {
  transactions: Transaction[];
}

export function SummaryStats({ transactions }: SummaryStatsProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const thisMonthIncome = thisMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const thisMonthExpenses = thisMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsRate = thisMonthIncome > 0 
    ? ((thisMonthIncome - thisMonthExpenses) / thisMonthIncome * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Receitas do Mês</p>
            <p className="text-2xl font-bold text-green-600">
              {thisMonthIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <TrendingUp className="text-green-600" size={24} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Despesas do Mês</p>
            <p className="text-2xl font-bold text-red-600">
              {thisMonthExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <TrendingDown className="text-red-600" size={24} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Taxa de Economia</p>
            <p className="text-2xl font-bold text-indigo-600">
              {savingsRate.toFixed(1)}%
            </p>
          </div>
          <Target className="text-indigo-600" size={24} />
        </div>
      </div>
    </div>
  );
}