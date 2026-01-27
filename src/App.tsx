import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/use-language";
import { AuthProvider } from "@/features/auth/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import BudgetPage from "@/features/budget/pages/BudgetPage";
import AnalyticsPage from "@/features/analytics/pages/AnalyticsPage";
import TransactionsPage from "@/features/transactions/pages/TransactionsPage";
import AccountsPage from "@/pages/accounts/AccountsPage";
import GoalsPage from "@/pages/goals/GoalsPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import ImportPage from "@/pages/import/ImportPage";
import InsightsPage from "@/pages/insights/InsightsPage";
import NotificationsPage from "@/pages/notifications/NotificationsPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import LoginPage from "@/pages/auth/LoginPage";
import FinanceDashboard from "@/pages/finance/FinanceDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/budgets" element={<ProtectedRoute><BudgetPage /></ProtectedRoute>} />
                <Route path="/advanced-dashboard" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
                <Route path="/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
                <Route path="/accounts" element={<ProtectedRoute><AccountsPage /></ProtectedRoute>} />
                <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
                <Route path="/import" element={<ProtectedRoute><ImportPage /></ProtectedRoute>} />
                <Route path="/insights" element={<ProtectedRoute><InsightsPage /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                <Route path="/finance" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
