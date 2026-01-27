export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  date: string; // ISO string
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon?: string;
  budget?: number; // Optional budget limit
  createdAt: string;
  updatedAt: string;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  categoriesBreakdown: {
    [category: string]: {
      amount: number;
      percentage: number;
    };
  };
}

export interface TransactionFormData {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  date: string;
}

export interface CategoryFormData {
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon?: string;
  budget?: number;
}