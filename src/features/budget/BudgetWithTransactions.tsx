import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Badge } from '@/shared/components/ui/badge';
import { 
  Upload, 
  FileText, 
  BarChart3, 
  Calendar, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import TransactionImportReport from './components/TransactionImportReport';
import { useTransactions } from '@/hooks/useTransactions';
import { useBudget } from './hooks/useBudget';
import BudgetDashboard from './components/BudgetDashboard';
import { formatCurrency, calculateBudgetSpentPercentage, getBudgetStatus } from './utils/budgetUtils';

interface BudgetWithTransactionsProps {
  className?: string;
}

const BudgetWithTransactions: React.FC<BudgetWithTransactionsProps> = ({ className = '' }) => {
  const {
    transactions,
    summary,
    categories,
    selectedCategory,
    setSelectedCategory,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    uploading,
    message,
    handleFileUpload,
    handleClearData,
    resetFilters
  } = useTransactions();

  const { budgetData, loading: budgetLoading, error: budgetError } = useBudget();

  const [activeTab, setActiveTab] = useState('overview');

  // Calculate transaction-based insights for budget
  const calculateTransactionInsights = () => {
    const totalSpent = summary.total_charges || 0;
    const totalCredits = summary.total_credits || 0;
    const netSpending = summary.net_spending || 0;
    
    // Calculate category breakdown from transactions
    const categoryBreakdown = summary.categories?.map(cat => ({
      name: cat.category,
      amount: Math.abs(cat.total),
      count: cat.count,
      percentage: totalSpent > 0 ? (Math.abs(cat.total) / totalSpent) * 100 : 0
    })) || [];

    return {
      totalSpent,
      totalCredits,
      netSpending,
      categoryBreakdown,
      transactionCount: transactions.length
    };
  };

  const insights = calculateTransactionInsights();

  // Merge budget data with transaction insights
  const mergedBudgetData = {
    ...budgetData,
    actualSpent: insights.totalSpent,
    remainingFromBudget: Math.max(0, budgetData.totalBudget - insights.totalSpent),
    categories: insights.categoryBreakdown
  };

  const spentPercentage = calculateBudgetSpentPercentage(
    budgetData.totalBudget, 
    insights.totalSpent
  );
  
  const budgetStatus = getBudgetStatus(spentPercentage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overspent': return 'destructive';
      case 'caution': return 'secondary'; // Using secondary instead of warning
      case 'on-track': return 'default'; // Using default instead of success
      default: return 'secondary';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget & Transactions</h1>
          <p className="text-muted-foreground">
            Manage your budget and import financial transactions
          </p>
        </div>
        <TabsList className="grid w-full sm:w-auto grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsContent value="overview" className="space-y-6">
          {/* Budget Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Budget Status
              </CardTitle>
              <CardDescription>
                Current budget utilization and spending overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {formatCurrency(budgetData.totalBudget)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Budget</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-destructive">
                    {formatCurrency(insights.totalSpent)}
                  </div>
                  <div className="text-sm text-muted-foreground">Actual Spent</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(mergedBudgetData.remainingFromBudget)}
                  </div>
                  <div className="text-sm text-muted-foreground">Remaining</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Budget Utilization</span>
                  <Badge variant={getStatusColor(budgetStatus) as any}>
                    {spentPercentage}% - {budgetStatus.charAt(0).toUpperCase() + budgetStatus.slice(1)}
                  </Badge>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      spentPercentage > 90 ? 'bg-red-500' : 
                      spentPercentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`} 
                    style={{ width: `${Math.min(100, spentPercentage)}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Transactions
                </CardDescription>
                <CardTitle className="text-2xl">{insights.transactionCount}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Credits
                </CardDescription>
                <CardTitle className="text-2xl text-green-600">
                  {formatCurrency(insights.totalCredits)}
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Charges
                </CardDescription>
                <CardTitle className="text-2xl text-destructive">
                  {formatCurrency(insights.totalSpent)}
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Net Spending
                </CardDescription>
                <CardTitle className={`text-2xl ${
                  insights.netSpending >= 0 ? 'text-green-600' : 'text-destructive'
                }`}>
                  {formatCurrency(insights.netSpending)}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Category Breakdown */}
          {insights.categoryBreakdown.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Detailed breakdown of your spending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.categoryBreakdown
                    .sort((a, b) => b.amount - a.amount)
                    .slice(0, 5)
                    .map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span className="font-medium">{category.name}</span>
                          <Badge variant="secondary">{category.count} transactions</Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {formatCurrency(category.amount)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {category.percentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <TransactionImportReport />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Spending Report
              </CardTitle>
              <CardDescription>
                Detailed analysis of your spending patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Date Range Selector */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Transactions</CardDescription>
                      <CardTitle>{transactions.length}</CardTitle>
                    </CardHeader>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Amount</CardDescription>
                      <CardTitle>{formatCurrency(summary.grand_total || 0)}</CardTitle>
                    </CardHeader>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Average Transaction</CardDescription>
                      <CardTitle>
                        {transactions.length > 0 
                          ? formatCurrency((summary.grand_total || 0) / transactions.length)
                          : '$0.00'
                        }
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button onClick={resetFilters} variant="outline">
                    Reset Filters
                  </Button>
                  <Button onClick={handleClearData} variant="destructive">
                    Clear All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetWithTransactions;