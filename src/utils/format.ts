/**
 * Formats a numeric string to currency with optional symbol
 * @param value Raw input value
 * @param symbol Default is "$"
 */
export function formatCurrency(value: string, symbol = "$"): string {
  if (value === "") return "";
  const cleaned = value.replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return value;
  return `${symbol}${num.toFixed(2)}`;
}

/**
 * Formats a number to currency using Intl.NumberFormat
 * @param amount The amount to format
 */
export function formatCurrencyIntl(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

/**
 * Formats a date string to a readable format
 * @param dateStr The date string to format
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Generates a CSS class name from a category name
 * @param category The category name
 */
export function getCategoryClassName(category: string): string {
  return category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
}
