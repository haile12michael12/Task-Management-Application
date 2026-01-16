import { useState } from "react";
import { cn } from "../../../utils/cn";

// Tab components
import BudgetDashboard from "../BudgetDashboard";
import TransactionTracker from "../../users/TransactionTracker";
import AnalyticsView from "../AnalyticsView";
import SettingsPanel from "../SettingsPanel";

// Icons
import { 
  Wallet, 
  FileText, 
  BarChart3, 
  Settings 
} from "lucide-react";

const ComprehensiveDashboard = () => {
  const [activeTab, setActiveTab] = useState("budget");
  const [theme, setTheme] = useState("light");

  const tabs = [
    { id: "budget", label: "Budget Planner", icon: Wallet },
    { id: "transactions", label: "Transaction Tracker", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      theme === "dark" 
        ? "bg-gray-900 text-white" 
        : "bg-gray-50 text-gray-900"
    )}>
      {/* Header */}
      <header className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-sm",
        theme === "dark" 
          ? "bg-gray-900/80 border-gray-700" 
          : "bg-white/80 border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Finance Dashboard
              </h1>
            </div>
            
            <nav className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      activeTab === tab.id
                        ? theme === "dark"
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-blue-100 text-blue-700 shadow-lg"
                        : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-lg transition-colors",
                theme === "dark"
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "budget" && <BudgetDashboard theme={theme} />}
        {activeTab === "transactions" && <TransactionTracker theme={theme} />}
        {activeTab === "analytics" && <AnalyticsView theme={theme} />}
        {activeTab === "settings" && <SettingsPanel theme={theme} />}
      </main>

      {/* Footer */}
      <footer className={cn(
        "py-6 border-t mt-12",
        theme === "dark" 
          ? "bg-gray-900 border-gray-700 text-gray-400" 
          : "bg-white border-gray-200 text-gray-500"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 Finance Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ComprehensiveDashboard;