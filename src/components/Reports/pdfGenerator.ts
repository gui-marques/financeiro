import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Transaction } from '../../types/finance';
import { defaultCategories } from '../../data/categories';

export function generatePDF(transactions: Transaction[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(20);
  doc.text('Relatório Financeiro', pageWidth / 2, 15, { align: 'center' });
  
  // Summary
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = income - expenses;

  doc.setFontSize(12);
  doc.text('Resumo Financeiro', 14, 30);
  
  const summaryData = [
    ['Receitas', formatCurrency(income)],
    ['Despesas', formatCurrency(expenses)],
    ['Saldo', formatCurrency(balance)]
  ];

  autoTable(doc, {
    startY: 35,
    head: [['Tipo', 'Valor']],
    body: summaryData,
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] }
  });

  // Transactions by Category
  const categorizedData = transactions.reduce((acc, transaction) => {
    const category = defaultCategories.find(c => c.id === transaction.category);
    const subcategory = category?.subcategories.find(s => s.id === transaction.subcategory);
    
    if (!acc[transaction.type]) {
      acc[transaction.type] = {};
    }
    
    if (!acc[transaction.type][category?.name || 'Outros']) {
      acc[transaction.type][category?.name || 'Outros'] = {
        total: 0,
        subcategories: {}
      };
    }
    
    acc[transaction.type][category?.name || 'Outros'].total += transaction.amount;
    
    if (subcategory) {
      if (!acc[transaction.type][category.name].subcategories[subcategory.name]) {
        acc[transaction.type][category.name].subcategories[subcategory.name] = 0;
      }
      acc[transaction.type][category.name].subcategories[subcategory.name] += transaction.amount;
    }
    
    return acc;
  }, {} as Record<string, Record<string, { total: number; subcategories: Record<string, number> }>>);

  // Add Categories Breakdown
  doc.addPage();
  doc.text('Detalhamento por Categorias', 14, 15);

  const categoryData: string[][] = [];
  
  ['income', 'expense'].forEach(type => {
    if (categorizedData[type]) {
      Object.entries(categorizedData[type]).forEach(([category, data]) => {
        categoryData.push([
          type === 'income' ? 'Receita' : 'Despesa',
          category,
          formatCurrency(data.total)
        ]);
        
        Object.entries(data.subcategories).forEach(([subcat, amount]) => {
          categoryData.push([
            '',
            `└ ${subcat}`,
            formatCurrency(amount)
          ]);
        });
      });
    }
  });

  autoTable(doc, {
    startY: 20,
    head: [['Tipo', 'Categoria', 'Valor']],
    body: categoryData,
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] }
  });

  // Recent Transactions
  doc.addPage();
  doc.text('Últimas Transações', 14, 15);

  const transactionData = transactions.map(t => {
    const category = defaultCategories.find(c => c.id === t.category);
    const subcategory = category?.subcategories.find(s => s.id === t.subcategory);
    return [
      new Date(t.date).toLocaleDateString('pt-BR'),
      t.description,
      `${category?.name || 'Outros'} > ${subcategory?.name || 'Outros'}`,
      t.type === 'income' ? 'Receita' : 'Despesa',
      formatCurrency(t.amount)
    ];
  });

  autoTable(doc, {
    startY: 20,
    head: [['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']],
    body: transactionData,
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] }
  });

  // Save the PDF
  doc.save('relatorio-financeiro.pdf');
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}