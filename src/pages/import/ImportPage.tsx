import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const ImportPage: React.FC = () => {
  return (
    <DashboardLayout title="Import" subtitle="Import your financial data" showTopNavbar={true}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Import Financial Data</h2>
        <p className="text-muted-foreground">This section will contain data import functionality.</p>
      </div>
    </DashboardLayout>
  );
};

export default ImportPage;