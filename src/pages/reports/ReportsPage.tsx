import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const ReportsPage: React.FC = () => {
  return (
    <DashboardLayout title="Reports" subtitle="Financial reports and analytics" showTopNavbar={true}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Financial Reports</h2>
        <p className="text-muted-foreground">This section will contain reporting and analytics features.</p>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;