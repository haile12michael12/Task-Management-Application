import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Demo data - will be replaced with real data
const budgets = [
  { category: "Housing", spent: 1800, budget: 2000, color: "bg-chart-1" },
  { category: "Food & Dining", spent: 450, budget: 600, color: "bg-chart-2" },
  { category: "Transportation", spent: 280, budget: 400, color: "bg-chart-3" },
  { category: "Shopping", spent: 380, budget: 300, color: "bg-chart-4" },
  { category: "Entertainment", spent: 120, budget: 200, color: "bg-chart-5" },
];

export function BudgetProgress() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {budgets.map((budget) => {
          const percentage = Math.min((budget.spent / budget.budget) * 100, 100);
          const isOverBudget = budget.spent > budget.budget;
          
          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{budget.category}</span>
                <span className={cn(
                  "font-semibold",
                  isOverBudget ? "text-destructive" : "text-muted-foreground"
                )}>
                  ${budget.spent.toLocaleString()} / ${budget.budget.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={percentage} 
                  className={cn(
                    "h-2",
                    isOverBudget && "[&>div]:bg-destructive"
                  )}
                />
              </div>
              {isOverBudget && (
                <p className="text-xs text-destructive">
                  Over budget by ${(budget.spent - budget.budget).toLocaleString()}
                </p>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
