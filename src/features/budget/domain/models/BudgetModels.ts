export interface BudgetCategory {
  id: string;
  title: string;
  subcategories: BudgetSubcategory[];
}

export interface BudgetSubcategory {
  id: string;
  label: string;
  value: string;
}

export interface BudgetSummary {
  totalBudget: number;
  spentAmount: number;
  remainingAmount: number;
  categories: BudgetCategory[];
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  subcategory: string;
  type: 'income' | 'expense';
}