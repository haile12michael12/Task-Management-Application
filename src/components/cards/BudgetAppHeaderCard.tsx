import { BorderTrail } from "../general/border-trail";
import BudgetCategoryCard from "./BudgetCategoryCard";

const BudgetAppHeaderCard = () => {
  return (
    <BorderTrail className="w-full max-w-4xl mx-auto">
      <BudgetCategoryCard title="Monthly Spending" />
    </BorderTrail>
  );
};

export default BudgetAppHeaderCard;
