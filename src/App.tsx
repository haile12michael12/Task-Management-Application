import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/use-language";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import BudgetTracker from "@/pages/BudgetTracker";
import AdvancedDashboard from "@/pages/AdvancedDashboard";
import TransactionParserPage from "@/pages/TransactionParserPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<BudgetTracker />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/advanced-dashboard" element={<AdvancedDashboard />} />
              <Route path="/transactions" element={<TransactionParserPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
