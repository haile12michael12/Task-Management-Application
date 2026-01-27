export interface Translations {
  common: {
    home: string;
    dashboard: string;
    budgets: string;
    transactions: string;
    goals: string;
    reports: string;
    advanced: string;
    settings: string;
    profile: string;
    signOut: string;
    selectLanguage: string;
    languagePreferenceSaved: string;
    products: string;
    searchPlaceholder: string;
    lightMode: string;
    darkMode: string;
    howItWorks: string;
    cancel: string;
  };
  transactionParser: {
    howItWorks: {
      stepsTitle: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
      privacyDesc: string;
    };
    notes: {
      amex: string;
      usbank: string;
      apple: string;
    };
    deleteModal: {
      title: string;
      message: string;
      confirm: string;
    };
  };
}

export const en: Translations = {
  common: {
    home: 'Home',
    dashboard: 'Dashboard',
    budgets: 'Budgets',
    transactions: 'Transactions',
    goals: 'Goals',
    reports: 'Reports',
    advanced: 'Advanced',
    settings: 'Settings',
    profile: 'Profile',
    signOut: 'Sign Out',
    selectLanguage: 'Select Language',
    languagePreferenceSaved: 'Your language preference is saved',
    products: 'Products',
    searchPlaceholder: 'Search...',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    howItWorks: 'How It Works',
    cancel: 'Cancel',
  },
  transactionParser: {
    howItWorks: {
      stepsTitle: 'How It Works',
      step1: 'Upload your bank statement CSV file',
      step2: 'The parser automatically extracts transaction data',
      step3: 'Review and categorize transactions as needed',
      step4: 'Export or analyze your financial data',
      privacyDesc: 'All processing happens locally in your browser. No data is sent to external servers.',
    },
    notes: {
      amex: 'American Express',
      usbank: 'US Bank',
      apple: 'Apple Card',
    },
    deleteModal: {
      title: 'Delete Transaction',
      message: 'Are you sure you want to delete this transaction? This action cannot be undone.',
      confirm: 'Delete',
    },
  },
};