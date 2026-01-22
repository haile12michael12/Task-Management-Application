import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface BudgetDashboardProps {
  totalBudget: number;
  spentAmount: number;
  remainingAmount: number;
}

const BudgetDashboard: React.FC<BudgetDashboardProps> = ({
  totalBudget,
  spentAmount,
  remainingAmount
}) => {
  const spentPercentage = Math.round((spentAmount / totalBudget) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Budget</CardDescription>
          <CardTitle className="text-2xl">${totalBudget.toFixed(2)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Your allocated budget amount
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Spent</CardDescription>
          <CardTitle className="text-2xl">${spentAmount.toFixed(2)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Amount used from budget
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Remaining</CardDescription>
          <CardTitle className="text-2xl">${remainingAmount.toFixed(2)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Left to spend this month
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Budget Progress</CardTitle>
          <CardDescription>
            {spentPercentage}% of your budget has been used
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                spentPercentage > 90 ? 'bg-red-500' : 
                spentPercentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
              }`} 
              style={{ width: `${spentPercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetDashboard;