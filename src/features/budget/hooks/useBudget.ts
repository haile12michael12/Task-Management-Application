import { useState, useEffect } from 'react';

interface BudgetData {
  totalBudget: number;
  spentAmount: number;
  remainingAmount: number;
}

export const useBudget = () => {
  const [budgetData, setBudgetData] = useState<BudgetData>({
    totalBudget: 0,
    spentAmount: 0,
    remainingAmount: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock loading of budget data
  useEffect(() => {
    const loadBudgetData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockData: BudgetData = {
          totalBudget: 5000,
          spentAmount: 2345.67,
          remainingAmount: 2654.33,
        };
        
        setBudgetData(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to load budget data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBudgetData();
  }, []);

  const updateBudget = (newTotal: number) => {
    setBudgetData(prev => ({
      ...prev,
      totalBudget: newTotal,
      remainingAmount: newTotal - prev.spentAmount,
    }));
  };

  const addExpense = (amount: number) => {
    setBudgetData(prev => ({
      ...prev,
      spentAmount: prev.spentAmount + amount,
      remainingAmount: Math.max(0, prev.totalBudget - (prev.spentAmount + amount)),
    }));
  };

  return {
    budgetData,
    loading,
    error,
    updateBudget,
    addExpense,
  };
};