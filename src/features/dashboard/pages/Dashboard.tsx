import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard, RecentTransactions, SpendingChart, MonthlyTrend, BudgetProgress, AccountsOverview } from "@/features/dashboard";
import { ThreeDChart, InteractiveSpendingChart } from "@/components";
import { useCategories } from "../../../hooks/useCategories";
import { useAIInsights } from "../../../hooks/useAIInsights";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  BarChart3,
  Sparkles
} from "lucide-react";

export default function Dashboard() {
  const { categories } = useCategories();
  const { insights, predictedSpending, loading } = useAIInsights();
  
  // Prepare data for the 3D chart
  const chartData = categories.map((category, index) => {
    const total = category.subcategories.reduce(
      (sum, sub) => sum + (parseFloat(sub.value) || 0),
      0
    );
    return {
      label: category.title,
      value: total,
      color: undefined // Will use default color cycling
    };
  }).filter(item => item.value > 0); // Only include categories with values
  
  // Prepare data for the interactive chart
  const interactiveChartData = categories.map((category, index) => {
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

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle="Welcome back! Here's your financial overview."
      showTopNavbar={true}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Balance"
            value="$44,250.00"
            change={{ value: "2.5% from last month", trend: "up" }}
            icon={Wallet}
            iconColor="primary"
          />
          <StatCard
            title="Monthly Income"
            value="$4,500.00"
            change={{ value: "Same as last month", trend: "neutral" }}
            icon={TrendingUp}
            iconColor="success"
          />
          <StatCard
            title="Monthly Expenses"
            value="$3,720.00"
            change={{ value: "12% from last month", trend: "down" }}
            icon={TrendingDown}
            iconColor="destructive"
          />
          <StatCard
            title="Savings Goal"
            value="$8,500.00"
            change={{ value: "68% of goal reached", trend: "up" }}
            icon={PiggyBank}
            iconColor="info"
          />
        </div>

        {/* Advanced Features Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-1">
            <div className="bg-white dark:bg-zinc-800/90 rounded-xl p-4 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold text-lg">AI Insights</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {loading ? 'Analyzing your spending patterns...' : 'Based on your recent activity:'}
              </p>
              <ul className="text-sm space-y-2">
                {insights.slice(0, 3).map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
                    <span>{insight.recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl p-1">
            <div className="bg-white dark:bg-zinc-800/90 rounded-xl p-4 h-full">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-lg">Prediction</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Next month's projected spending:
              </p>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${predictedSpending.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Based on your spending patterns
              </p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <MonthlyTrend />
          <SpendingChart />
        </div>
        
        {/* 3D and Interactive Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ThreeDChart 
            data={chartData} 
            title="3D Budget Distribution" 
          />
          <InteractiveSpendingChart 
            data={interactiveChartData} 
            title="Interactive Spending Analysis" 
          />
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentTransactions />
          </div>
          <BudgetProgress />
        </div>

        {/* Accounts */}
        <AccountsOverview />
      </div>
    </DashboardLayout>
  );
}
