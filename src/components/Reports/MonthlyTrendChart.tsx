import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { Transaction } from '../../types/finance';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyTrendChartProps {
  transactions: Transaction[];
}

export function MonthlyTrendChart({ transactions }: MonthlyTrendChartProps) {
  const monthlyData = transactions.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const monthYear = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = { income: 0, expense: 0 };
    }
    
    if (curr.type === 'income') {
      acc[monthYear].income += curr.amount;
    } else {
      acc[monthYear].expense += curr.amount;
    }
    
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  const labels = Object.keys(monthlyData);
  const incomeData = Object.values(monthlyData).map(d => d.income);
  const expenseData = Object.values(monthlyData).map(d => d.expense);

  const data = {
    labels,
    datasets: [
      {
        label: 'Receitas',
        data: incomeData,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Despesas',
        data: expenseData,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tendência Mensal',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => 
            value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <Line data={data} options={options} />
    </div>
  );
}