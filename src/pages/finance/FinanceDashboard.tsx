import React from 'react';

const FinanceDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Finance Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Balance</h2>
            <p className="text-3xl font-bold text-green-600">$12,345.67</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Income</h2>
            <p className="text-3xl font-bold text-blue-600">$8,000.00</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Expenses</h2>
            <p className="text-3xl font-bold text-red-600">$3,456.33</p>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="font-medium">Grocery Shopping</p>
                <p className="text-sm text-gray-500">January 15, 2024</p>
              </div>
              <p className="text-red-600 font-medium">-$125.50</p>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="font-medium">Salary Deposit</p>
                <p className="text-sm text-gray-500">January 1, 2024</p>
              </div>
              <p className="text-green-600 font-medium">+$4,000.00</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Electric Bill</p>
                <p className="text-sm text-gray-500">January 10, 2024</p>
              </div>
              <p className="text-red-600 font-medium">-$85.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;