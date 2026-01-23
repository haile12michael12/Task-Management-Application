export const en = {
  common: {
    dashboard: 'Dashboard',
    accounts: 'Accounts',
    transactions: 'Transactions',
    budgets: 'Budgets',
    goals: 'Goals',
    reports: 'Reports',
    advanced: 'Advanced',
    settings: 'Settings',
    import: 'Import',
    aiInsights: 'AI Insights',
    notifications: 'Notifications',
    howItWorks: 'How it works',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    confirm: 'Confirm',
    upload: 'Upload',
    clear: 'Clear',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    unknown: 'Unknown',
    selectLanguage: 'Select Language',
    languagePreferenceSaved: 'Your language preference is saved',
    home: 'Home',
    products: 'Products',
    profile: 'Profile',
    signOut: 'Sign Out',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    searchPlaceholder: 'Search...',
    localizationDemo: 'Localization Demo',
    testDifferentLanguages: 'Test the application in different languages',
    currentLanguage: 'Current Language',
    currentlyUsing: 'You are currently using',
    languageCode: 'Code',
    switchLanguage: 'Switch Language',
    choosePreferredLanguage: 'Choose your preferred language',
    translatedContent: 'Translated Content',
    examplesOfTranslatedText: 'Examples of translated text in the current language',
    navigation: 'Navigation',
    actions: 'Actions',
    languagePreferenceNotice: 'Your language preference is automatically saved and will persist across sessions.',
    browserDetection: 'The system automatically detects your browser language on first visit.',
  },
  transactionParser: {
    title: 'Transaction Parser',
    subtitle: 'Upload and analyze your bank statements',
    uploadTitle: 'Upload Bank Statement',
    uploadDesc: 'Drag and drop your CSV or PDF files here',
    uploadButton: 'Select Files',
    uploading: 'Uploading...',
    clearData: 'Clear Data',
    filters: {
      title: 'Filters',
      startDate: 'Start Date',
      endDate: 'End Date',
      category: 'Category',
      reset: 'Reset Filters',
    },
    summary: {
      title: 'Spending Summary',
      totalSpent: 'Total Spent',
      totalCredits: 'Total Credits',
      netSpending: 'Net Spending',
      transactionCount: 'Transactions',
      categories: 'Categories',
    },
    table: {
      date: 'Date',
      description: 'Description',
      category: 'Category',
      source: 'Source',
      amount: 'Amount',
      actions: 'Actions',
      noTransactions: 'No transactions found. Upload a CSV or PDF file to get started.',
    },
    deleteModal: {
      title: 'Delete Transaction',
      message: 'Are you sure you want to delete this transaction? This action cannot be undone.',
      confirm: 'Delete',
    },
    howItWorks: {
      title: 'How This Site Works',
      privacyTitle: 'Your Privacy First',
      privacyDesc: 'All processing happens locally in your browser. Your bank statements and transaction data never leave your device.',
      stepsTitle: 'How It Works',
      step1: 'Upload: Drop your bank statements (CSV or PDF format)',
      step2: 'Parse: The app processes your files locally',
      step3: 'Categorize: Transactions are automatically categorized',
      step4: 'Analyze: View spending summaries and filter by date',
    },
    notes: {
      amex: 'CSV/PDF support: American Express Credit Card',
      apple: 'CSV/PDF support: Apple Credit Card',
      usbank: 'CSV/PDF support: US Bank Credit Card',
    },
    helpContent: {
      amex: {
        title: 'How to find your American Express PDF',
        steps: [
          { text: 'Log in to your American Express account and click on <strong>Statements & Activity</strong>', altText: 'American Express navigation showing Statements & Activity tab' },
          { text: 'Click the <strong>Go to PDF Statements</strong> button', altText: 'Go to PDF Statements button' },
          { text: 'Find the statement you want to download and click the <strong>Download</strong> button', altText: 'Recent Statements list with Download buttons' },
          { text: 'Select <strong>Billing Statement (PDF)</strong> and click <strong>Download</strong>', altText: 'File type selection dialog with Billing Statement PDF selected' },
          { text: 'Once downloaded, use the upload button above to select and upload your PDF statement', altText: '' }
        ]
      },
      apple: {
        title: 'How to find your Apple Card statement',
        steps: [
          { text: 'Go to <strong>card.apple.com</strong> on your laptop and click on <strong>Statements</strong>', altText: 'Apple Card website showing Statements option' },
          { text: 'Find the statement you want and click the <strong>download icon</strong> on the right', altText: 'Statements list with download icons' },
          { text: 'Save the PDF to your device, then use the upload button above to select and upload it', altText: '' }
        ]
      }
    }
  }
};

export type Translations = typeof en;
