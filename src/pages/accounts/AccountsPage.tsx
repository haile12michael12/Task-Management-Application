import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const AccountsPage: React.FC = () => {
  return (
    <DashboardLayout title="Accounts" subtitle="Manage your financial accounts" showTopNavbar={true}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Accounts Management</h2>
        <p className="text-muted-foreground">This section will contain account management features.</p>
      </div>
    </DashboardLayout>
  );
};

export default AccountsPage;