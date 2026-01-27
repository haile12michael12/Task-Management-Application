import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const NotificationsPage: React.FC = () => {
  return (
    <DashboardLayout title="Notifications" subtitle="Your notifications and alerts" showTopNavbar={true}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Notifications Center</h2>
        <p className="text-muted-foreground">This section will contain notifications and alerts management.</p>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;