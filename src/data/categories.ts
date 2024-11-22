import { Category } from '../types/finance';
import { 
  Home, Car, Book, Coffee, Heart, Pizza, Briefcase, 
  Gift, DollarSign, Building, Plane, ShoppingBag,
  Plus, Gamepad2
} from 'lucide-react';

export const defaultCategories: Category[] = [
  // Despesas
  { 
    id: 'transport', 
    name: 'Transporte', 
    icon: 'Car', 
    type: 'expense',
    subcategories: [
      { id: 'transport-fuel', name: 'Combustível', categoryId: 'transport' },
      { id: 'transport-public', name: 'Transporte Público', categoryId: 'transport' },
      { id: 'transport-taxi', name: 'Taxi/Uber', categoryId: 'transport' },
      { id: 'transport-maintenance', name: 'Manutenção', categoryId: 'transport' }
    ]
  },
  { 
    id: 'housing', 
    name: 'Moradia', 
    icon: 'Home', 
    type: 'expense',
    subcategories: [
      { id: 'housing-rent', name: 'Aluguel', categoryId: 'housing' },
      { id: 'housing-utilities', name: 'Contas (água/luz/gás)', categoryId: 'housing' },
      { id: 'housing-internet', name: 'Internet', categoryId: 'housing' },
      { id: 'housing-maintenance', name: 'Manutenção', categoryId: 'housing' }
    ]
  },
  { 
    id: 'education', 
    name: 'Educação', 
    icon: 'Book', 
    type: 'expense',
    subcategories: [
      { id: 'education-tuition', name: 'Mensalidade', categoryId: 'education' },
      { id: 'education-books', name: 'Livros', categoryId: 'education' },
      { id: 'education-courses', name: 'Cursos', categoryId: 'education' },
      { id: 'education-materials', name: 'Materiais', categoryId: 'education' }
    ]
  },
  { 
    id: 'leisure', 
    name: 'Lazer', 
    icon: 'Gamepad2', 
    type: 'expense',
    subcategories: [
      { id: 'leisure-movies', name: 'Cinema', categoryId: 'leisure' },
      { id: 'leisure-games', name: 'Jogos', categoryId: 'leisure' },
      { id: 'leisure-sports', name: 'Esportes', categoryId: 'leisure' },
      { id: 'leisure-streaming', name: 'Streaming', categoryId: 'leisure' }
    ]
  },
  { 
    id: 'food', 
    name: 'Alimentação', 
    icon: 'Pizza', 
    type: 'expense',
    subcategories: [
      { id: 'food-grocery', name: 'Supermercado', categoryId: 'food' },
      { id: 'food-restaurant', name: 'Restaurante', categoryId: 'food' },
      { id: 'food-delivery', name: 'Delivery', categoryId: 'food' },
      { id: 'food-snacks', name: 'Lanches', categoryId: 'food' }
    ]
  },
  { 
    id: 'health', 
    name: 'Saúde', 
    icon: 'Heart', 
    type: 'expense',
    subcategories: [
      { id: 'health-insurance', name: 'Plano de Saúde', categoryId: 'health' },
      { id: 'health-medicine', name: 'Medicamentos', categoryId: 'health' },
      { id: 'health-consultation', name: 'Consultas', categoryId: 'health' },
      { id: 'health-exams', name: 'Exames', categoryId: 'health' }
    ]
  },
  { 
    id: 'shopping', 
    name: 'Compras', 
    icon: 'ShoppingBag', 
    type: 'expense',
    subcategories: [
      { id: 'shopping-clothes', name: 'Roupas', categoryId: 'shopping' },
      { id: 'shopping-electronics', name: 'Eletrônicos', categoryId: 'shopping' },
      { id: 'shopping-home', name: 'Casa', categoryId: 'shopping' },
      { id: 'shopping-personal', name: 'Cuidados Pessoais', categoryId: 'shopping' }
    ]
  },
  { 
    id: 'travel', 
    name: 'Viagem', 
    icon: 'Plane', 
    type: 'expense',
    subcategories: [
      { id: 'travel-tickets', name: 'Passagens', categoryId: 'travel' },
      { id: 'travel-accommodation', name: 'Hospedagem', categoryId: 'travel' },
      { id: 'travel-food', name: 'Alimentação', categoryId: 'travel' },
      { id: 'travel-activities', name: 'Atividades', categoryId: 'travel' }
    ]
  },
  { 
    id: 'other_expense', 
    name: 'Outros', 
    icon: 'Plus', 
    type: 'expense',
    subcategories: [
      { id: 'other-expense-misc', name: 'Diversos', categoryId: 'other_expense' }
    ]
  },

  // Receitas
  { 
    id: 'salary', 
    name: 'Salário', 
    icon: 'DollarSign', 
    type: 'income',
    subcategories: [
      { id: 'salary-base', name: 'Salário Base', categoryId: 'salary' },
      { id: 'salary-bonus', name: 'Bônus', categoryId: 'salary' },
      { id: 'salary-13th', name: '13º Salário', categoryId: 'salary' },
      { id: 'salary-vacation', name: 'Férias', categoryId: 'salary' }
    ]
  },
  { 
    id: 'freelance', 
    name: 'Freelance', 
    icon: 'Briefcase', 
    type: 'income',
    subcategories: [
      { id: 'freelance-dev', name: 'Desenvolvimento', categoryId: 'freelance' },
      { id: 'freelance-design', name: 'Design', categoryId: 'freelance' },
      { id: 'freelance-consulting', name: 'Consultoria', categoryId: 'freelance' }
    ]
  },
  { 
    id: 'investments', 
    name: 'Investimentos', 
    icon: 'Building', 
    type: 'income',
    subcategories: [
      { id: 'investments-stocks', name: 'Ações', categoryId: 'investments' },
      { id: 'investments-fixed', name: 'Renda Fixa', categoryId: 'investments' },
      { id: 'investments-real-estate', name: 'Imóveis', categoryId: 'investments' }
    ]
  },
  { 
    id: 'gifts', 
    name: 'Presentes', 
    icon: 'Gift', 
    type: 'income',
    subcategories: [
      { id: 'gifts-money', name: 'Dinheiro', categoryId: 'gifts' },
      { id: 'gifts-voucher', name: 'Vale-Presente', categoryId: 'gifts' }
    ]
  },
  { 
    id: 'other_income', 
    name: 'Outros', 
    icon: 'Plus', 
    type: 'income',
    subcategories: [
      { id: 'other-income-misc', name: 'Diversos', categoryId: 'other_income' }
    ]
  },
];

export const icons = {
  Car, Home, Book, Coffee, Heart, Pizza, Briefcase, 
  Gift, DollarSign, Building, Plane, ShoppingBag,
  Plus, Gamepad2
};