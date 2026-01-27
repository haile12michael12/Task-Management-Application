import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThreeDChart, AdvancedAnalyticsDashboard, InteractiveSpendingChart, DataFilterControls } from '@/components';
import { useAIInsights } from '@/hooks/useAIInsights';
import { useCategories } from '@/hooks/useCategories';
import { TrendingUp, Target, Calendar, Sparkles } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const { insights, recurringExpenses, predictedSpending, loading } = useAIInsights();
  const { categories } = useCategories();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const chartData = categories.map((category) => {
    const total = category.subcategories.reduce(
      (sum, sub) => sum + (parseFloat(sub.value) || 0),
      0
    );
    return {
      label: category.title,
      value: total,
      color: undefined
    };
  }).filter(item => item.value > 0);

  const interactiveChartData = categories.map((category) => {
    const total = category.subcategories.reduce(
      (sum, sub) => sum + (parseFloat(sub.value) || 0),
      0
    );
    return {
      name: category.title,
      value: total,
      color: undefined
    };
  }).filter(item => item.value > 0);

  const analyticsData = {
    categorySpending: chartData,
    predictedSpending: predictedSpending || 5000,
    actualSpending: chartData.reduce((sum, item) => sum + item.value, 0),
    savingsRate: 25.5,
    budgetUtilization: 78.3,
    recommendations: [
      "Consider reducing spending in Entertainment category by 15%",
      "Automate savings transfer to reach 20% savings rate",
      "Review subscription services in Housing category",
      "Set up alerts for spending in Food & Dining category"
    ],
    trends: [
      { category: "Food & Dining", trend: "up" as const, percentage: 12.5 },
      { category: "Transportation", trend: "down" as const, percentage: 8.2 },
      { category: "Entertainment", trend: "up" as const, percentage: 15.3 },
      { category: "Housing", trend: "stable" as const, percentage: 2.1 },
      { category: "Shopping", trend: "up" as const, percentage: 5.7 }
    ]
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
  };

  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setSortConfig({ key: sortBy, direction: sortOrder });
  };

  const availableFilters = [
    { id: 'high-value', label: 'High Value (> $100)', value: 'high-value' },
    { id: 'low-value', label: 'Low Value (< $50)', value: 'low-value' },
    { id: 'this-month', label: 'This Month', value: 'this-month' },
    { id: 'last-week', label: 'Last Week', value: 'last-week' },
    { id: 'recurring', label: 'Recurring', value: 'recurring' },
    { id: 'needs-review', label: 'Needs Review', value: 'needs-review' }
  ];

  const availableSortOptions = [
    { id: 'amount', label: 'Amount', value: 'desc' as const },
    { id: 'date', label: 'Date', value: 'desc' as const },
    { id: 'category', label: 'Category', value: 'asc' as const },
    { id: 'name', label: 'Name', value: 'asc' as const }
  ];

  return (
    <DashboardLayout title="Advanced Analytics" subtitle="Comprehensive insights and 3D visualizations" showTopNavbar={true}>
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI-Powered Insights</h3>
                <p className="text-indigo-100">Smart analysis of your spending patterns</p>
              </div>
            </div>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
              View Full Report
            </Button>
          </CardContent>
        </Card>

        <DataFilterControls 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          availableFilters={availableFilters}
          availableSortOptions={availableSortOptions}
        />

        <AdvancedAnalyticsDashboard data={analyticsData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                3D Budget Distribution
              </CardTitle>
              <CardDescription>Visualize your spending across categories in 3D</CardDescription>
            </CardHeader>
            <CardContent>
              <ThreeDChart data={chartData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Interactive Spending Analysis
              </CardTitle>
              <CardDescription>Click bars to see detailed breakdowns</CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveSpendingChart data={interactiveChartData} />
            </CardContent>
          </Card>
        </div>

        {recurringExpenses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recurring Expenses
              </CardTitle>
              <CardDescription>Subscription and recurring payments detected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recurringExpenses.slice(0, 6).map((expense, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium">{expense.description}</h4>
                      <p className="text-sm text-muted-foreground">Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${expense.amount?.toFixed(2)}</p>
                      <Badge variant="secondary">Auto</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {loading && (
          <Card>
            <CardContent className="p-8 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p>Generating AI insights...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
