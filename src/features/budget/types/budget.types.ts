export interface BudgetData {
  totalBudget: number;
  spentAmount: number;
  remainingAmount: number;
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  budgetedAmount: number;
  spentAmount: number;
  color: string;
}

export interface BudgetPlan {
  id: string;
  name: string;
  monthlyIncome: number;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
}