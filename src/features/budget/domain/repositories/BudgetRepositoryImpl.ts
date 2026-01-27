import { BudgetCategory, Transaction } from '../models/BudgetModels';
import { BudgetRepository, TransactionRepository } from './BudgetRepositoryInterface';

export class BudgetRepositoryImpl implements BudgetRepository {
  private categories: BudgetCategory[] = [];
  
  async getBudgetCategories(): Promise<BudgetCategory[]> {
    // Simulate async operation
    return new Promise(resolve => {
      setTimeout(() => resolve(this.categories), 100);
    });
  }

  async addCategory(category: Omit<BudgetCategory, 'id'>): Promise<BudgetCategory> {
    const newCategory: BudgetCategory = {
      ...category,
      id: `cat_${Date.now()}`,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async updateCategory(category: BudgetCategory): Promise<BudgetCategory> {
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index !== -1) {
      this.categories[index] = category;
      return category;
    }
    throw new Error(`Category with id ${category.id} not found`);
  }

  async deleteCategory(id: string): Promise<void> {
    this.categories = this.categories.filter(c => c.id !== id);
  }
}

export class TransactionRepositoryImpl implements TransactionRepository {
  private transactions: Transaction[] = [];
  
  async getTransactions(): Promise<Transaction[]> {
    // Simulate async operation
    return new Promise(resolve => {
      setTimeout(() => resolve(this.transactions), 100);
    });
  }

  async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const newTransaction: Transaction = {
      ...transaction,
      id: `trans_${Date.now()}`,
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  async updateTransaction(transaction: Transaction): Promise<Transaction> {
    const index = this.transactions.findIndex(t => t.id === transaction.id);
    if (index !== -1) {
      this.transactions[index] = transaction;
      return transaction;
    }
    throw new Error(`Transaction with id ${transaction.id} not found`);
  }

  async deleteTransaction(id: string): Promise<void> {
    this.transactions = this.transactions.filter(t => t.id !== id);
  }
}