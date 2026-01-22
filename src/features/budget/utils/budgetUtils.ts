/**
 * Calculate the remaining budget amount
 * @param totalBudget - The total budget amount
 * @param spentAmount - The amount already spent
 * @returns The remaining budget amount
 */
export const calculateRemainingBudget = (totalBudget: number, spentAmount: number): number => {
  return Math.max(0, totalBudget - spentAmount);
};

/**
 * Calculate the percentage of budget spent
 * @param totalBudget - The total budget amount
 * @param spentAmount - The amount already spent
 * @returns The percentage of budget spent (0-100)
 */
export const calculateBudgetSpentPercentage = (totalBudget: number, spentAmount: number): number => {
  if (totalBudget <= 0) return 0;
  return Math.min(100, Math.round((spentAmount / totalBudget) * 100));
};

/**
 * Determine the budget status based on percentage spent
 * @param percentage - The percentage of budget spent
 * @returns The budget status ('on-track', 'caution', 'overspent')
 */
export const getBudgetStatus = (percentage: number): 'on-track' | 'caution' | 'overspent' => {
  if (percentage >= 100) return 'overspent';
  if (percentage >= 80) return 'caution';
  return 'on-track';
};

/**
 * Format currency amount for display
 * @param amount - The amount to format
 * @param currency - The currency code (default: USD)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Validate a budget amount
 * @param amount - The amount to validate
 * @returns True if valid, false otherwise
 */
export const isValidBudgetAmount = (amount: unknown): amount is number => {
  return typeof amount === 'number' && !isNaN(amount) && amount >= 0 && isFinite(amount);
};

/**
 * Calculate budget variance (difference between planned and actual)
 * @param plannedAmount - The planned/allocated amount
 * @param actualAmount - The actual amount spent
 * @returns The variance (positive = under budget, negative = over budget)
 */
export const calculateBudgetVariance = (plannedAmount: number, actualAmount: number): number => {
  return plannedAmount - actualAmount;
};

/**
 * Check if a budget is overdrawn
 * @param remainingAmount - The remaining budget amount
 * @returns True if overdrawn, false otherwise
 */
export const isOverdrawn = (remainingAmount: number): boolean => {
  return remainingAmount < 0;
};