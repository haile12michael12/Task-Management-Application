import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout title="Settings" subtitle="Configure your application settings" showTopNavbar={true}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Application Settings</h2>
        <p className="text-muted-foreground">This section will contain application configuration options.</p>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;