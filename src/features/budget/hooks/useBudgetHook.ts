import { useState, useEffect } from 'react';
import { BudgetCategory, BudgetSubcategory } from '../domain/models/BudgetModels';

// Define the interface for our hook to follow the Dependency Inversion Principle
export interface BudgetHookInterface {
  categories: BudgetCategory[];
  loading: boolean;
  error: string | null;
  addCategory: (category: Omit<BudgetCategory, 'id'>) => Promise<void>;
  updateCategory: (category: BudgetCategory) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addSubcategory: (categoryId: string, subcategory: Omit<BudgetSubcategory, 'id'>) => Promise<void>;
}

// Create a hook that implements the interface, following the Single Responsibility Principle
export const useBudgetHook = (): BudgetHookInterface => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // For demonstration, using the existing useCategories hook functionality
  // In a real implementation, this would connect to our BudgetService
  
  // Simplified implementation that simulates the service calls
  const addCategory = async (category: Omit<BudgetCategory, 'id'>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      const newCategory: BudgetCategory = {
        ...category,
        id: `cat_${Date.now()}`
      };
      
      setCategories(prev => [...prev, newCategory]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (updatedCategory: BudgetCategory) => {
    setLoading(true);
    setError(null);
    
    try {
      setCategories(prev => 
        prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  const addSubcategory = async (categoryId: string, subcategory: Omit<BudgetSubcategory, 'id'>) => {
    setLoading(true);
    setError(null);
    
    try {
      setCategories(prev => 
        prev.map(cat => {
          if (cat.id === categoryId) {
            return {
              ...cat,
              subcategories: [
                ...cat.subcategories,
                { ...subcategory, id: `subcat_${Date.now()}` }
              ]
            };
          }
          return cat;
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add subcategory');
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    // In a real implementation, this would call the service
    // const loadCategories = async () => {
    //   setLoading(true);
    //   try {
    //     const service = BudgetServiceFactory.createBudgetService();
    //     const data = await service.getAllCategories();
    //     setCategories(data);
    //   } catch (err) {
    //     setError(err instanceof Error ? err.message : 'Failed to load categories');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // For now, initialize with sample data
    setCategories([
      {
        id: 'cat_1',
        title: 'Food & Dining',
        subcategories: [
          { id: 'sub_1', label: 'Groceries', value: '350' },
          { id: 'sub_2', label: 'Restaurants', value: '200' }
        ]
      },
      {
        id: 'cat_2',
        title: 'Transportation',
        subcategories: [
          { id: 'sub_3', label: 'Gas', value: '150' },
          { id: 'sub_4', label: 'Public Transit', value: '80' }
        ]
      }
    ]);
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubcategory
  };
};