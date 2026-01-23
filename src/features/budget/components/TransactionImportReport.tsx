import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { 
  Upload, 
  FileText, 
  BarChart3, 
  Calendar, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';
import { formatCurrency } from '../utils/budgetUtils';

interface TransactionImportReportProps {
  className?: string;
}

const TransactionImportReport: React.FC<TransactionImportReportProps> = ({ className = '' }) => {
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

  const [showFilters, setShowFilters] = useState(false);

  // Calculate additional metrics
  const calculateMetrics = () => {
    // Type-safe access to summary properties
    const totalSpent = (summary as any).total_charges || 0;
    const totalCredits = (summary as any).total_credits || 0;
    const netSpending = (summary as any).net_spending || 0;
    
    // Top spending categories
    const categoriesArray = Array.isArray((summary as any).categories) ? (summary as any).categories : [];
    const topCategories = categoriesArray
      .sort((a: any, b: any) => Math.abs(b.total) - Math.abs(a.total))
      .slice(0, 5)
      .map((cat: any) => ({
        category: cat.category,
        total: cat.total,
        count: cat.count
      }));

    // Daily spending average
    const dateRangeDays = startDate && endDate 
      ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
      : 30; // Default to 30 days
    
    const dailyAverage = totalSpent / dateRangeDays;

    return {
      totalSpent,
      totalCredits,
      netSpending,
      topCategories,
      dailyAverage,
      transactionCount: transactions.length
    };
  };

  const metrics = calculateMetrics();

  // Handle file upload
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fakeEvent = {
        target: { files: e.target.files }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(fakeEvent);
    }
  };

  // Export data function
  const handleExport = () => {
    const csvContent = [
      ['Date', 'Description', 'Category', 'Amount', 'Source'],
      ...transactions.map(tx => [
        new Date(tx.timestamp).toLocaleDateString(),
        tx.title,
        tx.category,
        tx.amount.toString(),
        tx.source || 'Unknown'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Transaction Import & Reports</h2>
          <p className="text-muted-foreground">
            Import bank statements and analyze your spending patterns
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="sm"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button 
            onClick={handleExport}
            variant="outline"
            size="sm"
            disabled={transactions.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            onClick={resetFilters}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Transactions
          </CardTitle>
          <CardDescription>
            Upload CSV or PDF bank statements to track your spending
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="upload-btn cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <FileText className="h-4 w-4" />
                {uploading ? 'Processing...' : 'Choose Files'}
                <input
                  type="file"
                  accept=".csv,.pdf"
                  onChange={handleFileInputChange}
                  disabled={uploading}
                  multiple
                  hidden
                  aria-label="Upload bank statement files"
                />
              </label>
              
              <Button 
                onClick={handleClearData}
                variant="destructive"
                disabled={transactions.length === 0}
              >
                Clear All Data
              </Button>
            </div>

            {message.text && (
              <div className={`p-3 rounded-md ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <p>Supported formats: CSV, PDF</p>
              <p>Maximum file size: 2MB per file</p>
              <p>Supported banks: American Express, Apple Card, US Bank, and more</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters Section */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Total Transactions
            </CardDescription>
            <CardTitle className="text-2xl">{metrics.transactionCount}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Credits
            </CardDescription>
            <CardTitle className="text-2xl text-green-600">
              {formatCurrency(metrics.totalCredits)}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Total Charges
            </CardDescription>
            <CardTitle className="text-2xl text-destructive">
              {formatCurrency(metrics.totalSpent)}
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
              metrics.netSpending >= 0 ? 'text-green-600' : 'text-destructive'
            }`}>
              {formatCurrency(metrics.netSpending)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Category Breakdown */}
      {metrics.topCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Spending Categories</CardTitle>
            <CardDescription>Your highest spending categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.topCategories.map((category: any, index: number) => (
                <div key={category.category} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-red-500' :
                      index === 1 ? 'bg-orange-500' :
                      index === 2 ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{category.category}</div>
                      <div className="text-sm text-muted-foreground">
                        {category.count} transactions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      {formatCurrency(Math.abs(category.total))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metrics.totalSpent > 0 ? ((Math.abs(category.total) / metrics.totalSpent) * 100).toFixed(1) : '0.0'}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Transactions Preview */}
      {transactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest imported transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Date</th>
                    <th className="text-left pb-2">Description</th>
                    <th className="text-left pb-2">Category</th>
                    <th className="text-right pb-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions
                    .slice(0, 10)
                    .map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50">
                        <td className="py-2 text-sm">
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </td>
                        <td className="py-2">
                          <div className="font-medium">{transaction.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.source || 'Unknown Source'}
                          </div>
                        </td>
                        <td className="py-2">
                          <Badge variant="secondary">{transaction.category}</Badge>
                        </td>
                        <td className="py-2 text-right font-medium">
                          <span className={
                            transaction.amount >= 0 ? 'text-green-600' : 'text-destructive'
                          }>
                            {formatCurrency(transaction.amount)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {transactions.length > 10 && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Showing 10 of {transactions.length} transactions
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {transactions.length === 0 && !uploading && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload your bank statements to start tracking your spending
            </p>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Import Transactions
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TransactionImportReport;