import { BudgetData } from '../types/budget.types';

export interface BudgetService {
  getBudgetData(): Promise<BudgetData>;
  updateBudget(budget: Partial<BudgetData>): Promise<BudgetData>;
  addExpense(amount: number, category?: string): Promise<void>;
  deleteExpense(id: string): Promise<void>;
}

class BudgetApiService implements BudgetService {
  private baseUrl: string = '/api/budget';

  async getBudgetData(): Promise<BudgetData> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        totalBudget: 5000,
        spentAmount: 2345.67,
        remainingAmount: 2654.33,
      };
    } catch (error) {
      throw new Error(`Failed to fetch budget data: ${error}`);
    }
  }

  async updateBudget(budget: Partial<BudgetData>): Promise<BudgetData> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      // In a real implementation, this would update the budget
      return {
        totalBudget: budget.totalBudget || 5000,
        spentAmount: budget.spentAmount || 2345.67,
        remainingAmount: (budget.totalBudget || 5000) - (budget.spentAmount || 2345.67),
      };
    } catch (error) {
      throw new Error(`Failed to update budget: ${error}`);
    }
  }

  async addExpense(amount: number, category?: string): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log(`Added expense: $${amount} in category: ${category || 'general'}`);
    } catch (error) {
      throw new Error(`Failed to add expense: ${error}`);
    }
  }

  async deleteExpense(id: string): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log(`Deleted expense with id: ${id}`);
    } catch (error) {
      throw new Error(`Failed to delete expense: ${error}`);
    }
  }
}

// Export singleton instance
export const budgetService = new BudgetApiService();

// For testing purposes, we can also export the class
export { BudgetApiService };