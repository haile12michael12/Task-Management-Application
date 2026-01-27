import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign, Calendar } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import ThreeDChart from './ThreeDChart';

interface AnalyticsData {
  categorySpending: {
    label: string;
    value: number;
    color?: string;
  }[];
  predictedSpending: number;
  actualSpending: number;
  savingsRate: number;
  budgetUtilization: number;
  recommendations: string[];
  trends: {
    category: string;
    trend: 'up' | 'down' | 'stable';
    percentage: number;
  }[];
}

interface AdvancedAnalyticsDashboardProps {
  data: AnalyticsData;
}

const AdvancedAnalyticsDashboard: React.FC<AdvancedAnalyticsDashboardProps> = ({ data }) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-500" />
              Predicted Spending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.predictedSpending.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              vs Actual: ${data.actualSpending.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Savings Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.savingsRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              Above target: {(data.savingsRate - 20).toFixed(1)}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-amber-500" />
              Budget Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.budgetUtilization.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              {data.budgetUtilization > 90 ? (
                <span className="text-destructive flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Over budget risk
                </span>
              ) : (
                <span className="text-success">On track</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              Next Month Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(data.predictedSpending * 1.05).toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> 5% increase
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3D Chart and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3D Chart Visualization */}
        <div className="lg:col-span-1">
          <ThreeDChart 
            data={data.categorySpending} 
            title="Spending Distribution (3D View)" 
          />
        </div>

        {/* Spending Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
            <CardDescription>Category-wise spending changes over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.trends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {trend.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    ) : trend.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-success" />
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-muted" />
                    )}
                    <span className="font-medium">{trend.category}</span>
                  </div>
                  <Badge 
                    variant={trend.trend === 'up' ? 'destructive' : trend.trend === 'down' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {trend.trend} {Math.abs(trend.percentage)}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>Smart recommendations based on your spending patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.recommendations.map((rec, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-secondary/20 border-secondary/30' 
                    : 'bg-secondary/30 border-secondary'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-primary/10 rounded-full">
                    <SparklesIcon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">{rec}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Define the SparklesIcon since lucide-react doesn't export it directly in the import
const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1Z" />
    <path d="M12 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1Z" />
    <path d="M5 12a1 1 0 0 1 1 1h1a1 1 0 0 1 0-2h-1a1 1 0 0 1-1 1Z" />
    <path d="M16 12a1 1 0 0 1 1 1h1a1 1 0 0 1 0-2h-1a1 1 0 0 1-1 1Z" />
    <path d="M3.5 4.5a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 0 1-1.414 1.414L3.5 6.014A1 1 0 0 1 3.5 4.5Z" />
    <path d="M17.5 17.5a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414Z" />
    <path d="M3.5 19.5a1 1 0 0 1 0-1.414L4.914 16.67a1 1 0 0 1 1.414 1.414L4.914 19.5a1 1 0 0 1-1.414 0Z" />
    <path d="M17.5 4.5a1 1 0 0 1 0-1.414L19.086 4.5a1 1 0 0 1-1.414 1.414L17.5 4.5Z" />
  </svg>
);

export default AdvancedAnalyticsDashboard;
