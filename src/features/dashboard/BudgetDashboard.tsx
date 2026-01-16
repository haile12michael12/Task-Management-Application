import { useState } from "react";
import { cn } from "../../utils/cn";
import { useCategories } from "../../core/hooks/useCategories";
import { useCurrency } from "../../core/hooks/useCurrency";
import { exportCategoriesToExcelWithStyle } from "../../core/utils/exportToExcel";
import { exportCategoriesToPDF } from "../../core/utils/exportCategoriesToPdf";

// Existing components
import RightPane from "./components/right-pane";
import LeftPane from "./components/left-pane";
import BudgetAppHeaderCard from "./components/BudgetAppHeaderCard";
import { ModernSimpleInput } from "../../components/ui/ModernSimpleInput";
import { BeforeEffectButton } from "../../components/ui/BeforeEffectButton";

// Icons
import { Download, FileSpreadsheet } from "lucide-react";

// Assets
const ExcelIcon = "/excel.png";
const PdfIcon = "/pdf-icon.png";

interface BudgetDashboardProps {
  theme: string;
}

const BudgetDashboard = ({ theme }: BudgetDashboardProps) => {
  const [income, setIncome] = useState<string>("");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { format, parseCurrency } = useCurrency();

  const {
    categories,
    addCategory,
    handleSubcategoryChange,
    handleSubcategoryLabelChange,
    addSubcategory,
    deleteSubcategory,
    deleteCategory,
  } = useCategories();

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    addCategory(newCategoryName);
    setShowAddCategoryModal(false);
    setNewCategoryName("");
  };

  const handleExportToExcel = () => {
    exportCategoriesToExcelWithStyle(categories);
  };

  const handleExportToPDF = () => {
    exportCategoriesToPDF(categories);
  };

  const categoryTotals = categories.map((cat: any) =>
    cat.subcategories.reduce(
      (sum: number, sub: any) => sum + (parseFloat(sub.value) || 0),
      0
    )
  );

  const totalSpent = categoryTotals.reduce((a: number, b: number) => a + b, 0);
  const incomeAmount = parseCurrency(income);

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
        <BeforeEffectButton
          onClick={handleExportToPDF}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
            theme === "dark"
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          )}
        >
          <img src={PdfIcon} alt="" className="w-5 h-5" />
          Export to PDF
        </BeforeEffectButton>
        
        <BeforeEffectButton
          onClick={handleExportToExcel}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
            theme === "dark"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          )}
        >
          <img src={ExcelIcon} alt="" className="w-5 h-5" />
          Export to Excel
        </BeforeEffectButton>
      </div>

      {/* Dashboard Content */}
      <div className="space-y-6">
        <BudgetAppHeaderCard />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeftPane
            income={income}
            setIncome={setIncome}
            format={format}
            parseCurrency={parseCurrency}
            categories={categories}
            handleSubcategoryChange={handleSubcategoryChange}
            handleSubcategoryLabelChange={handleSubcategoryLabelChange}
            addSubcategory={addSubcategory}
            deleteSubcategory={deleteSubcategory}
            deleteCategory={deleteCategory}
            setShowAddCategoryModal={setShowAddCategoryModal}
          />
          
          <RightPane
            format={format}
            totalSpent={totalSpent}
            incomeAmount={incomeAmount}
            categories={categories}
            categoryTotals={categoryTotals}
          />
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={cn(
            "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md",
            theme === "dark" ? "border border-gray-700" : ""
          )}>
            <h3 className={cn(
              "text-lg font-semibold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              New Category
            </h3>

            <div className="space-y-4">
              <div>
                <label className={cn(
                  "text-sm font-medium block mb-1",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                )}>
                  Category Name
                </label>
                <ModernSimpleInput
                  type="text"
                  value={newCategoryName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Entertainment"
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddCategoryModal(false)}
                  className={cn(
                    "text-sm px-4 py-2 rounded-md border",
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className={cn(
                    "text-sm px-4 py-2 rounded-md",
                    theme === "dark"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetDashboard;