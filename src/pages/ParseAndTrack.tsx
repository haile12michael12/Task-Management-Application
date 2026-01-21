import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import UploadSection from "../components/parse-and-track/UploadSection";
import FiltersSection from "../components/parse-and-track/FiltersSection";
import SummarySection from "../components/parse-and-track/SummarySection";
import TransactionsTable from "../components/parse-and-track/TransactionsTable";
import HowItWorksModal from "../components/parse-and-track/HowItWorksModal";
import ConfirmDeleteModal from "../components/parse-and-track/ConfirmDeleteModal";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import "./ParseAndTrack.css";

export default function ParseAndTrack() {
    const [showHowItWorks, setShowHowItWorks] = useState(false);
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
        sortField,
        sortDirection,
        deletingId,
        setDeletingId,
        deleteConfirmOpen,
        setDeleteConfirmOpen,
        handleFileUpload,
        handleClearData,
        handleCategoryChange,
        handleDeleteTransaction,
        handleSort,
        resetFilters,
    } = useTransactions();

    return (
        <DashboardLayout title="Parse & Track Spending" subtitle="Upload statements and track your expenses">
            <div className="parse-and-track-container h-full">
                <div className="app p-0 max-w-none">
                    <header className="mb-8 flex items-center justify-between gap-4">
                        <h1 className="sr-only">Spending</h1>
                        <button
                            className="how-it-works-btn ml-auto"
                            onClick={() => setShowHowItWorks(true)}
                            aria-label="How this site works"
                        >
                            How This Works
                        </button>
                    </header>

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

                    <HowItWorksModal
                        isOpen={showHowItWorks}
                        onClose={() => setShowHowItWorks(false)}
                    />

                    <ConfirmDeleteModal
                        isOpen={deleteConfirmOpen}
                        onClose={() => {
                            setDeleteConfirmOpen(false);
                            setDeletingId(null);
                        }}
                        onConfirm={() => handleDeleteTransaction(deletingId)}
                        title="Delete Transaction?"
                        message="This transaction will be permanently deleted. This action cannot be undone."
                        confirmText="Delete"
                        cancelText="Keep"
                        isDangerous={true}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
