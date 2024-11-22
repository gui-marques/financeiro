import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { Transaction } from '../../types/finance';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseByCategoryChartProps {
  transactions: Transaction[];
}

export function ExpenseByCategoryChart({ transactions }: ExpenseByCategoryChartProps) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Despesas por Categoria',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <Doughnut data={data} options={options} />
    </div>
  );
}