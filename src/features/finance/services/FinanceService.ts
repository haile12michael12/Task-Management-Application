import { supabase } from '@/integrations/supabase/client';
import { 
  Transaction, 
  Category, 
  FinanceSummary, 
  TransactionFormData,
  CategoryFormData 
} from '../types/finance.types';

class FinanceServiceImpl {
  async getTransactions(userId: string, startDate?: string, endDate?: string): Promise<Transaction[]> {
    let query = supabase
      .from('transactions')
      .select('*')
      .eq('userId', userId)
      .order('date', { ascending: false });

    if (startDate && endDate) {
      query = query.gte('date', startDate).lte('date', endDate);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data as Transaction[];
  }

  async getTransactionById(transactionId: string, userId: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .eq('userId', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Record not found
      throw new Error(error.message);
    }

    return data as Transaction;
  }

  async createTransaction(transaction: TransactionFormData, userId: string): Promise<Transaction> {
    const newTransaction = {
      ...transaction,
      userId,
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('transactions')
      .insert([newTransaction])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Transaction;
  }

  async updateTransaction(
    transactionId: string, 
    transaction: Partial<TransactionFormData>, 
    userId: string
  ): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .update({
        ...transaction,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', transactionId)
      .eq('userId', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Transaction;
  }

  async deleteTransaction(transactionId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId)
      .eq('userId', userId);

    if (error) {
      throw new Error(error.message);
    }
  }

  async getCategories(userId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('userId', userId)
      .order('name');

    if (error) {
      throw new Error(error.message);
    }

    return data as Category[];
  }

  async getCategoryById(categoryId: string, userId: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .eq('userId', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Record not found
      throw new Error(error.message);
    }

    return data as Category;
  }

  async createCategory(category: CategoryFormData, userId: string): Promise<Category> {
    const newCategory = {
      ...category,
      userId,
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('categories')
      .insert([newCategory])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Category;
  }

  async updateCategory(
    categoryId: string, 
    category: Partial<CategoryFormData>, 
    userId: string
  ): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .update({
        ...category,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', categoryId)
      .eq('userId', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Category;
  }

  async deleteCategory(categoryId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId)
      .eq('userId', userId);

    if (error) {
      throw new Error(error.message);
    }
  }

  async getFinanceSummary(userId: string, startDate?: string, endDate?: string): Promise<FinanceSummary> {
    // Get transactions for the period
    const transactions = await this.getTransactions(userId, startDate, endDate);

    // Calculate summary
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpenses;

    // Group by month if needed
    const monthlyIncome = totalIncome; // Simplified for now
    const monthlyExpenses = totalExpenses; // Simplified for now

    // Categories breakdown
    const categoriesBreakdown: FinanceSummary['categoriesBreakdown'] = {};
    transactions.forEach(transaction => {
      if (!categoriesBreakdown[transaction.category]) {
        categoriesBreakdown[transaction.category] = {
          amount: 0,
          percentage: 0,
        };
      }
      categoriesBreakdown[transaction.category].amount += transaction.amount;
    });

    // Calculate percentages
    Object.keys(categoriesBreakdown).forEach(category => {
      const amount = categoriesBreakdown[category].amount;
      const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
      categoriesBreakdown[category].percentage = parseFloat(percentage.toFixed(2));
    });

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      monthlyIncome,
      monthlyExpenses,
      categoriesBreakdown,
    };
  }
}

export const financeService = new FinanceServiceImpl();