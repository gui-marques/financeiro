import type { Transaction, Category } from '../types/finance';

const DB_PATH = 'src/data/db.json';

async function readDB() {
  try {
    const response = await fetch(DB_PATH);
    return await response.json();
  } catch (error) {
    console.error('Erro ao ler o banco de dados:', error);
    return { transactions: [], customCategories: [] };
  }
}

async function writeDB(data: any) {
  try {
    const response = await fetch(DB_PATH, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, null, 2),
    });
    return response.ok;
  } catch (error) {
    console.error('Erro ao escrever no banco de dados:', error);
    return false;
  }
}

export async function getTransactions(): Promise<Transaction[]> {
  const db = await readDB();
  return db.transactions;
}

export async function getCustomCategories(): Promise<Category[]> {
  const db = await readDB();
  return db.customCategories;
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  const db = await readDB();
  const newTransaction: Transaction = {
    ...transaction,
    id: Math.random().toString(36).substr(2, 9),
  };
  
  db.transactions.unshift(newTransaction);
  await writeDB(db);
  
  return newTransaction;
}

export async function deleteTransaction(id: string): Promise<boolean> {
  const db = await readDB();
  db.transactions = db.transactions.filter((t: Transaction) => t.id !== id);
  return await writeDB(db);
}

export async function addCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const db = await readDB();
  const newCategory: Category = {
    ...category,
    id: Math.random().toString(36).substr(2, 9),
  };
  
  db.customCategories.push(newCategory);
  await writeDB(db);
  
  return newCategory;
}