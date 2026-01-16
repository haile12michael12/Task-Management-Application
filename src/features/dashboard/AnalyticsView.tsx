import { cn } from "../../utils/cn";

const AnalyticsView = ({ theme }: { theme: string }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={cn(
          "text-2xl font-bold",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}>
          Analytics & Insights
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Overview Chart */}
        <div className={cn(
          "rounded-xl p-6",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <h3 className={cn(
            "text-lg font-semibold mb-4",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Spending Overview
          </h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className={cn(
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                Interactive charts showing your spending patterns over time
              </p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className={cn(
          "rounded-xl p-6",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <h3 className={cn(
            "text-lg font-semibold mb-4",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Category Breakdown
          </h3>
          <div className="space-y-3">
            {[
              { category: "Housing", amount: 1200, percentage: 35 },
              { category: "Food", amount: 600, percentage: 17.5 },
              { category: "Transportation", amount: 400, percentage: 11.7 },
              { category: "Entertainment", amount: 300, percentage: 8.8 },
              { category: "Utilities", amount: 250, percentage: 7.3 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    index === 0 ? "bg-blue-500" :
                    index === 1 ? "bg-green-500" :
                    index === 2 ? "bg-yellow-500" :
                    index === 3 ? "bg-purple-500" :
                    "bg-red-500"
                  }`}></div>
                  <span className={cn(
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "font-semibold",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    ${item.amount}
                  </div>
                  <div className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  )}>
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className={cn(
        "rounded-xl p-6",
        theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
      )}>
        <h3 className={cn(
          "text-lg font-semibold mb-4",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}>
          Monthly Spending Trends
        </h3>
        <div className="h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className={cn(
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              Trend analysis showing your spending habits over the past 6 months
            </p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={cn(
          "p-4 rounded-lg",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="text-2xl font-bold text-blue-600 mb-2">↓ 12%</div>
          <h4 className={cn(
            "font-semibold mb-1",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>vs Last Month</h4>
          <p className={cn(
            "text-sm",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>Your spending decreased compared to last month</p>
        </div>
        
        <div className={cn(
          "p-4 rounded-lg",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="text-2xl font-bold text-green-600 mb-2">↑ 8%</div>
          <h4 className={cn(
            "font-semibold mb-1",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>Savings Rate</h4>
          <p className={cn(
            "text-sm",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>Percentage of income saved this month</p>
        </div>
        
        <div className={cn(
          "p-4 rounded-lg",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="text-2xl font-bold text-purple-600 mb-2">🎯</div>
          <h4 className={cn(
            "font-semibold mb-1",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>On Track</h4>
          <p className={cn(
            "text-sm",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>You're meeting your budget goals this month</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;