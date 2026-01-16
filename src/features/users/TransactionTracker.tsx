import { useState } from "react";
import { cn } from "../../utils/cn";

// Import actual transaction components
import UploadSection from './components/UploadSection';
import FiltersSection from './components/FiltersSection';
import SummarySection from './components/SummarySection';
import TransactionsTable from './components/TransactionsTable';
import HowItWorksModal from './components/HowItWorksModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import InstructionModal from './components/InstructionModal';
import SortHeader from './components/SortHeader';
const TransactionTracker = ({ theme }: { theme: string }) => {
  const [activeView, setActiveView] = useState("upload");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={cn(
          "text-2xl font-bold",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}>
          Transaction Tracker
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView("upload")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeView === "upload"
                ? theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700"
                : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Upload
          </button>
          
          <button
            onClick={() => setActiveView("transactions")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeView === "transactions"
                ? theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700"
                : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Transactions
          </button>
          
          <button
            onClick={() => setActiveView("filters")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeView === "filters"
                ? theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700"
                : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Filters
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className={cn(
        "rounded-xl p-6",
        theme === "dark" 
          ? "bg-gray-800 border border-gray-700" 
          : "bg-white border border-gray-200"
      )}>
        {activeView === "upload" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className={cn(
              "text-lg font-semibold mb-2",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Upload Financial Documents
            </h3>
            <p className={cn(
              "mb-6 max-w-md mx-auto",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              Upload your CSV or PDF bank statements to automatically track your transactions and categorize your spending.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className={cn(
                "px-4 py-2 rounded-lg",
                theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
              )}>
                📄 CSV Files Supported
              </div>
              <div className={cn(
                "px-4 py-2 rounded-lg",
                theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
              )}>
                📑 PDF Statements Supported
              </div>
            </div>
          </div>
        )}

        {activeView === "transactions" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className={cn(
              "text-lg font-semibold mb-2",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Transaction History
            </h3>
            <p className={cn(
              "mb-6",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              View, edit, and manage all your tracked transactions with detailed categorization and filtering options.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className={cn(
                "p-4 rounded-lg text-center",
                theme === "dark" ? "bg-gray-700" : "bg-gray-50"
              )}>
                <div className="text-2xl font-bold text-blue-600">📊</div>
                <div className={cn(
                  "font-medium mt-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>Smart Categorization</div>
              </div>
              <div className={cn(
                "p-4 rounded-lg text-center",
                theme === "dark" ? "bg-gray-700" : "bg-gray-50"
              )}>
                <div className="text-2xl font-bold text-green-600">🔍</div>
                <div className={cn(
                  "font-medium mt-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>Advanced Filtering</div>
              </div>
              <div className={cn(
                "p-4 rounded-lg text-center",
                theme === "dark" ? "bg-gray-700" : "bg-gray-50"
              )}>
                <div className="text-2xl font-bold text-purple-600">✏️</div>
                <div className={cn(
                  "font-medium mt-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>Easy Editing</div>
              </div>
            </div>
          </div>
        )}

        {activeView === "filters" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <h3 className={cn(
              "text-lg font-semibold mb-2",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Filter & Analyze
            </h3>
            <p className={cn(
              "mb-6",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              Filter transactions by date, category, amount, and merchant to gain insights into your spending patterns.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className={cn(
                "px-3 py-1 rounded-full text-sm",
                theme === "dark" 
                  ? "bg-blue-900 text-blue-300" 
                  : "bg-blue-100 text-blue-800"
              )}>
                Date Range
              </span>
              <span className={cn(
                "px-3 py-1 rounded-full text-sm",
                theme === "dark" 
                  ? "bg-green-900 text-green-300" 
                  : "bg-green-100 text-green-800"
              )}>
                Categories
              </span>
              <span className={cn(
                "px-3 py-1 rounded-full text-sm",
                theme === "dark" 
                  ? "bg-purple-900 text-purple-300" 
                  : "bg-purple-100 text-purple-800"
              )}>
                Amount Range
              </span>
              <span className={cn(
                "px-3 py-1 rounded-full text-sm",
                theme === "dark" 
                  ? "bg-yellow-900 text-yellow-300" 
                  : "bg-yellow-100 text-yellow-800"
              )}>
                Merchants
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={cn(
          "p-4 rounded-lg text-center",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="text-2xl mb-2">💳</div>
          <h4 className={cn(
            "font-semibold mb-1",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>Multiple Banks</h4>
          <p className={cn(
            "text-sm",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>Support for Amex, Apple Card, US Bank and more</p>
        </div>
        
        <div className={cn(
          "p-4 rounded-lg text-center",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="text-2xl mb-2">🤖</div>
          <h4 className={cn(
            "font-semibold mb-1",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>Auto-Categorization</h4>
          <p className={cn(
            "text-sm",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>Smart transaction categorization</p>
        </div>
        
        <div className={cn(
          "p-4 rounded-lg text-center",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="text-2xl mb-2">📈</div>
          <h4 className={cn(
            "font-semibold mb-1",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>Insights</h4>
          <p className={cn(
            "text-sm",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>Detailed spending analytics</p>
        </div>
        
        <div className={cn(
          "p-4 rounded-lg text-center",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="text-2xl mb-2">🔒</div>
          <h4 className={cn(
            "font-semibold mb-1",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>Privacy First</h4>
          <p className={cn(
            "text-sm",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>All data stays local on your device</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionTracker;