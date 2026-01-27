import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const InsightsPage: React.FC = () => {
  return (
    <DashboardLayout title="AI Insights" subtitle="Intelligent financial insights" showTopNavbar={true}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">AI Financial Insights</h2>
        <p className="text-muted-foreground">This section will contain AI-powered insights and recommendations.</p>
      </div>
    </DashboardLayout>
  );
};

export default InsightsPage;