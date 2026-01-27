# Advanced Spending Tracker

An advanced spending tracker application that combines transaction tracking and budget planning in a unified interface. This application allows users to import financial data from CSV/PDF files, categorize transactions automatically, manage budgets, and visualize spending patterns. The application now includes user authentication and enhanced finance tracking capabilities.

## Features



- **User Authentication**: Secure login and registration with Supabase authentication
- **Transaction Import**: Import transactions from CSV and PDF files (supports major banks like Amex, Apple Card, US Bank)
- **Automatic Categorization**: Smart categorization based on merchant names and descriptions
- **Budget Planning**: Create and manage budget categories with subcategories
- **Expense Tracking**: Monitor spending against budget allocations
- **Data Visualization**: Charts and graphs to visualize spending patterns
- **Dark/Light Theme**: Toggle between dark and light modes
- **Export Options**: Export budget data to Excel and PDF formats
- **Transaction Management**: Edit, categorize, and delete transactions
- **Filtering & Sorting**: Filter transactions by date, category, and sort by various criteria
- **Personalized Finance Tracker**: User-specific transactions and categories
- **Financial Summaries**: Real-time calculation of income, expenses, and net balance
- **Category Management**: Create custom income and expense categories with color coding and budget limits

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **Charts**: Chart.js for data visualization
- **Authentication**: Supabase for user authentication and database
- **Icons**: Lucide React for UI icons
- **Date Handling**: date-fns for date formatting
- **Build Tool**: Vite
- **File Processing**: PapaParse for CSV, PDF.js for PDF documents
- **State Management**: React Hooks with custom hooks
- **Formatters**: Custom currency and date formatters
- **Deployment**: Automated deployment with GitHub Actions to GitHub Pages

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5174/`

## Usage

### Importing Transactions
1. Click on the "Choose Files" button in the upload section
2. Select CSV or PDF files containing your financial statements
3. The application will automatically parse and categorize your transactions
4. Review and adjust categories as needed

### Managing Budgets
1. Enter your monthly income in the income field
2. Create categories and subcategories for your expenses
3. Allocate budget amounts to each subcategory
4. Track actual spending against budgeted amounts

### Viewing Reports
1. View spending summaries and category breakdowns
2. Use the chart to visualize spending patterns
3. Export data to Excel or PDF for external analysis

## Project Structure

```
src/
├── components/           # React components
│   ├── UploadSection.tsx
│   ├── FiltersSection.tsx
│   ├── SummarySection.tsx
│   ├── TransactionsTable.tsx
│   ├── left-pane.tsx
│   ├── right-pane.tsx
│   └── ...
├── features/            # Feature-based organization
│   ├── auth/            # Authentication feature
│   │   ├── components/  # Auth UI components
│   │   ├── hooks/       # Auth hooks and context
│   │   ├── services/    # Auth API services
│   │   └── types/       # Auth type definitions
│   └── finance/         # Finance tracking feature
│       ├── components/  # Finance UI components
│       ├── hooks/       # Finance hooks and context
│       ├── services/    # Finance API services
│       └── types/       # Finance type definitions
├── hooks/               # Custom React hooks
│   ├── useTransactions.ts
│   ├── useCategories.ts
│   └── useTheme.ts
├── utils/               # Utility functions
│   ├── parsers.ts
│   ├── storage.ts
│   ├── formatters.ts
│   └── ...
├── data/                # Static data
│   └── defaultCategories.ts
├── lib/types/           # Type definitions
└── workers/             # Web Workers
    └── parserWorker.ts
```

## Key Components

- **UploadSection**: Handles file uploads and parsing
- **TransactionsTable**: Displays and manages transaction data
- **Budget Planning Panel**: Manages categories and budget allocation
- **SummarySection**: Provides spending summaries and insights
- **Visualization**: Charts showing spending patterns

## Custom Hooks

- **useTransactions**: Manages transaction data, parsing, and operations
- **useCategories**: Manages budget categories and subcategories
- **useTheme**: Handles theme toggling between light and dark modes
- **useCurrency**: Formats and parses currency values

## Data Flow

1. **Import**: Files are parsed and transactions are extracted
2. **Categorization**: Transactions are automatically categorized based on merchant names
3. **Storage**: Transactions are stored in localStorage
4. **Filtering**: Transactions are filtered based on user selections
5. **Visualization**: Data is presented in tables and charts

## Deployment

The application is configured for automated deployment to GitHub Pages using GitHub Actions:

1. Push changes to the `main` branch
2. The workflow will automatically build and deploy the application
3. Access the deployed application at: https://haile12michael12.github.io/Task-Management-Application

Alternatively, you can deploy manually using:
```bash
npm run deploy
```

This command automatically builds the project first (due to the `predeploy` script) and then deploys the built files to the configured GitHub Pages branch using the gh-pages package.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Charts powered by Chart.js
- File parsing with PapaParse and PDF.js