import { useState, useEffect } from 'react';
import { AIInsightsService } from '../services/ai-insights-service';
import { useCategories } from './useCategories';

interface CategoryInsight {
  category: string;
  predictedAmount: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  recommendation: string;
}

interface AIInsights {
  loading: boolean;
  error: string | null;
  insights: CategoryInsight[];
  recurringExpenses: any[];
  predictedSpending: number;
  generateInsights: () => Promise<void>;
  predictCategory: (description: string, amount: number) => Promise<{ category: string; confidence: number }>;
}

export const useAIInsights = (): AIInsights => {
  const { categories } = useCategories(); // Get current categories to analyze
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<CategoryInsight[]>([]);
  const [recurringExpenses, setRecurringExpenses] = useState<any[]>([]);
  const [predictedSpending, setPredictedSpending] = useState<number>(0);

  // Convert categories to transactions format for AI analysis
  const convertCategoriesToTransactions = () => {
    const transactions: any[] = [];
    
    categories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        if (subcategory.value && parseFloat(subcategory.value) > 0) {
          transactions.push({
            id: `${category.title}-${subcategory.label}`,
            description: subcategory.label || category.title,
            amount: parseFloat(subcategory.value),
            date: new Date().toISOString(),
            category: category.title,
          });
        }
      });
    });
    
    return transactions;
  };

  const generateInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const transactions = convertCategoriesToTransactions();
      
      // Generate insights
      const insightsResult = await AIInsightsService.generateSpendingInsights(transactions);
      setInsights(insightsResult);
      
      // Detect recurring expenses
      const recurring = await AIInsightsService.detectRecurringExpenses(transactions);
      setRecurringExpenses(recurring);
      
      // Predict next month's spending
      const prediction = await AIInsightsService.predictNextMonthSpending(transactions);
      setPredictedSpending(prediction);
      
    } catch (err) {
      console.error('Error generating AI insights:', err);
      setError('Failed to generate insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const predictCategory = async (description: string, amount: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const transaction = {
        id: 'temp',
        description,
        amount,
        date: new Date().toISOString()
      };
      
      const result = await AIInsightsService.predictCategory(transaction);
      return result;
    } catch (err) {
      console.error('Error predicting category:', err);
      setError('Failed to predict category. Please try again.');
      return { category: 'Uncategorized', confidence: 0 };
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate insights when categories change
  useEffect(() => {
    generateInsights();
  }, [categories]); // Only regenerate when categories change

  return {
    loading,
    error,
    insights,
    recurringExpenses,
    predictedSpending,
    generateInsights,
    predictCategory
  };
};