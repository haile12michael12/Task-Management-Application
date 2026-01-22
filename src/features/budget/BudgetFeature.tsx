import React from 'react';
import { useBudget } from './hooks/useBudget';
import BudgetDashboard from './components/BudgetDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

const BudgetFeature: React.FC = () => {
  const { budgetData, loading, error, updateBudget, addExpense } = useBudget();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Budget Management</h1>
        <p className="text-muted-foreground">
          Track and manage your budget effectively
        </p>
      </div>

      <BudgetDashboard 
        totalBudget={budgetData.totalBudget}
        spentAmount={budgetData.spentAmount}
        remainingAmount={budgetData.remainingAmount}
      />

      {/* Example controls */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
            <CardDescription>Record a new expense</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Amount"
                className="flex-1 p-2 border rounded-md"
                onChange={(e) => {
                  const amount = parseFloat(e.target.value);
                  if (!isNaN(amount)) {
                    addExpense(amount);
                  }
                }}
              />
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => addExpense(100)} // Example: add $100 expense
              >
                Add
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Budget</CardTitle>
            <CardDescription>Adjust your total budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="New budget"
                className="flex-1 p-2 border rounded-md"
                onChange={(e) => {
                  const newBudget = parseFloat(e.target.value);
                  if (!isNaN(newBudget)) {
                    updateBudget(newBudget);
                  }
                }}
              />
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => updateBudget(6000)} // Example: set budget to $6000
              >
                Update
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetFeature;