import { BudgetCategory, Transaction } from '../models/BudgetModels';

export interface BudgetRepository {
  getBudgetCategories(): Promise<BudgetCategory[]>;
  addCategory(category: Omit<BudgetCategory, 'id'>): Promise<BudgetCategory>;
  updateCategory(category: BudgetCategory): Promise<BudgetCategory>;
  deleteCategory(id: string): Promise<void>;
}

export interface TransactionRepository {
  getTransactions(): Promise<Transaction[]>;
  addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction>;
  updateTransaction(transaction: Transaction): Promise<Transaction>;
  deleteTransaction(id: string): Promise<void>;
}