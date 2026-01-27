import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import TransactionParser from "@/components/transaction-parser/TransactionParser";

const TransactionParserPage = () => {
  return (
    <DashboardLayout title="Transaction Parser" subtitle="Upload and analyze your bank statements" showTopNavbar={true}>
      <TransactionParser />
    </DashboardLayout>
  );
};

export default TransactionParserPage;
