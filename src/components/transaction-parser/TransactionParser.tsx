import React, { useState } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { useLanguage } from '@/hooks/use-language';
import UploadSection from './sections/UploadSection';
import FiltersSection from './sections/FiltersSection';
import SummarySection from './sections/SummarySection';
import TransactionsTable from './sections/TransactionsTable';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import HowItWorksModal from './modals/HowItWorksModal';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import './TransactionParser.css';

const TransactionParser = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const { t } = useLanguage();
  const {
    transactions,
    summary,
    categories,
    selectedCategory,
    setSelectedCategory,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    uploading,
    message,
    editingId,
    setEditingId,
    handleCategoryChange,
    sortField,
    sortDirection,
    handleSort,
    deletingId,
    setDeletingId,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    handleFileUpload,
    handleClearData,
    resetFilters,
    handleDeleteTransaction
  } = useTransactions();

  return (
    <div className="transaction-parser-container space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setShowHowItWorks(true)}>
          <HelpCircle className="mr-2 h-4 w-4" />
          {t.common.howItWorks}
        </Button>
      </div>

      <UploadSection
        uploading={uploading}
        message={message}
        handleFileUpload={handleFileUpload}
        handleClearData={handleClearData}
      />

      <FiltersSection
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        resetFilters={resetFilters}
      />

      <SummarySection
        summary={summary}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <TransactionsTable
        transactions={transactions}
        editingId={editingId}
        setEditingId={setEditingId}
        handleCategoryChange={handleCategoryChange}
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
        deletingId={deletingId}
        setDeletingId={setDeletingId}
        setDeleteConfirmOpen={setDeleteConfirmOpen}
      />

      <ConfirmDeleteModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={() => handleDeleteTransaction(deletingId)}
        title={t.transactionParser.deleteModal.title}
        message={t.transactionParser.deleteModal.message}
        confirmText={t.transactionParser.deleteModal.confirm}
        cancelText={t.common.cancel}
        isDangerous={true}
      />

      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </div>
  );
};

export default TransactionParser;
