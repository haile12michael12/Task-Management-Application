import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const GoalsPage: React.FC = () => {
  return (
    <DashboardLayout title="Goals" subtitle="Set and track your financial goals" showTopNavbar={true}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Financial Goals</h2>
        <p className="text-muted-foreground">This section will contain goal setting and tracking features.</p>
      </div>
    </DashboardLayout>
  );
};

export default GoalsPage;