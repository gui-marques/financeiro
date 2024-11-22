import React from 'react';
import { Download } from 'lucide-react';
import { SummaryStats } from './SummaryStats';
import { MonthlyTrendChart } from './MonthlyTrendChart';
import { ExpenseByCategoryChart } from './ExpenseByCategoryChart';
import { SubcategoryBreakdown } from './SubcategoryBreakdown';
import { generatePDF } from './pdfGenerator';
import type { Transaction } from '../../types/finance';

interface ReportsProps {
  transactions: Transaction[];
}

export function Reports({ transactions }: ReportsProps) {
  const handleDownloadPDF = () => {
    generatePDF(transactions);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Relatório Financeiro</h2>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Download size={20} />
          Baixar PDF
        </button>
      </div>

      <SummaryStats transactions={transactions} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyTrendChart transactions={transactions} />
        <ExpenseByCategoryChart transactions={transactions} />
      </div>

      <SubcategoryBreakdown transactions={transactions} />
    </div>
  );
}