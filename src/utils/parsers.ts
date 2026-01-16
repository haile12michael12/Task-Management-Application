// Type definitions for the parsers module
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  merchant: string;
  timestamp: string;
}

export interface ParseResult {
  transactions: Transaction[];
  source: string;
  insertedCount: number;
  skippedCount: number;
}

// Re-export functions from the JavaScript module
export { 
  parseCSV, 
  parsePDF, 
  categorizeTransaction, 
  cleanMerchantName,
  isTransferOrPayment,
  parseAmount,
  parseDate
} from './parsers.js';