/**
 * AI-Powered Insights Service
 * Provides intelligent expense categorization and insights
 */

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category?: string;
  subcategory?: string;
}

interface CategoryInsight {
  category: string;
  predictedAmount: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  recommendation: string;
}

interface SpendingPattern {
  category: string;
  percentageOfTotal: number;
  avgAmount: number;
  frequency: number;
  seasonal: boolean;
}

export class AIInsightsService {
  /**
   * Predicts the category for a transaction based on its description
   */
  static predictCategory(transaction: Transaction): Promise<{ category: string; confidence: number }> {
    return new Promise((resolve) => {
      // Simulate AI processing time
      setTimeout(() => {
        const description = transaction.description.toLowerCase();
        let category = 'Uncategorized';
        let confidence = 0.5;

        // Rule-based categorization (would be replaced with ML model in production)
        if (this.matchesKeyword(description, ['grocery', 'market', 'supermarket', 'whole foods', 'costco', 'aldi'])) {
          category = 'Food & Dining';
          confidence = 0.95;
        } else if (this.matchesKeyword(description, ['gas', 'fuel', 'shell', 'chevron', 'exxon', 'mobile'])) {
          category = 'Transportation';
          confidence = 0.9;
        } else if (this.matchesKeyword(description, ['amazon', 'online', 'store', 'shopping', 'retail'])) {
          category = 'Shopping';
          confidence = 0.85;
        } else if (this.matchesKeyword(description, ['netflix', 'spotify', 'disney', 'hulu', 'movie', 'cinema'])) {
          category = 'Entertainment';
          confidence = 0.9;
        } else if (this.matchesKeyword(description, ['rent', 'mortgage', 'utilities', 'electric', 'water', 'gas bill'])) {
          category = 'Housing';
          confidence = 0.95;
        } else if (this.matchesKeyword(description, ['uber', 'lyft', 'taxi', 'transport', 'carpool'])) {
          category = 'Transportation';
          confidence = 0.88;
        } else if (this.matchesKeyword(description, ['restaurant', 'cafe', 'dining', 'takeout', 'delivery'])) {
          category = 'Food & Dining';
          confidence = 0.92;
        } else if (this.matchesKeyword(description, ['gym', 'fitness', 'sport', 'exercise', 'workout'])) {
          category = 'Health & Fitness';
          confidence = 0.85;
        } else if (this.matchesKeyword(description, ['airbnb', 'hotel', 'booking', 'travel', 'expedia'])) {
          category = 'Travel';
          confidence = 0.9;
        } else if (this.matchesKeyword(description, ['subscription', 'membership', 'recurring', 'monthly'])) {
          category = 'Subscriptions';
          confidence = 0.88;
        }

        resolve({ category, confidence });
      }, 300); // Simulate processing delay
    });
  }

  /**
   * Generates insights based on spending patterns
   */
  static generateSpendingInsights(transactions: Transaction[]): Promise<CategoryInsight[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Group transactions by category
        const categoryMap = new Map<string, Transaction[]>();
        
        transactions.forEach(transaction => {
          const category = transaction.category || 'Uncategorized';
          if (!categoryMap.has(category)) {
            categoryMap.set(category, []);
          }
          categoryMap.get(category)?.push(transaction);
        });

        const insights: CategoryInsight[] = [];

        categoryMap.forEach((transList, category) => {
          // Calculate average spending
          const totalAmount = transList.reduce((sum, t) => sum + Math.abs(t.amount), 0);
          const avgAmount = totalAmount / transList.length;
          
          // Determine trend (simplified for demo)
          let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
          if (transList.length > 1) {
            const recentAvg = transList.slice(-3).reduce((sum, t) => sum + Math.abs(t.amount), 0) / 3;
            const olderAvg = transList.slice(0, 3).reduce((sum, t) => sum + Math.abs(t.amount), 0) / 3;
            
            if (recentAvg > olderAvg * 1.1) trend = 'increasing';
            if (recentAvg < olderAvg * 0.9) trend = 'decreasing';
          }

          // Generate recommendation
          let recommendation = 'Spending looks normal';
          if (trend === 'increasing') {
            recommendation = 'Spending in this category is increasing. Consider reviewing your budget.';
          } else if (trend === 'decreasing') {
            recommendation = 'Great job! Your spending in this category is decreasing.';
          }

          insights.push({
            category,
            predictedAmount: avgAmount * 1.05, // Predict 5% increase
            confidence: 0.75,
            trend,
            recommendation
          });
        });

        resolve(insights);
      }, 500); // Simulate processing delay
    });
  }

  /**
   * Detects recurring expenses (subscriptions)
   */
  static detectRecurringExpenses(transactions: Transaction[]): Promise<Transaction[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Group by description
        const groupedByDesc = new Map<string, Transaction[]>();
        
        transactions.forEach(transaction => {
          const desc = transaction.description.toLowerCase();
          if (!groupedByDesc.has(desc)) {
            groupedByDesc.set(desc, []);
          }
          groupedByDesc.get(desc)?.push(transaction);
        });

        // Find potential recurring expenses
        const recurring: Transaction[] = [];
        
        groupedByDesc.forEach((transList, desc) => {
          if (transList.length >= 2) {
            // Check if transactions are roughly monthly
            const dates = transList.map(t => new Date(t.date)).sort((a, b) => a.getTime() - b.getTime());
            
            // Calculate intervals between transactions
            const intervals = [];
            for (let i = 1; i < dates.length; i++) {
              const diffTime = Math.abs(dates[i].getTime() - dates[i - 1].getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              intervals.push(diffDays);
            }
            
            // If most intervals are around 28-35 days, likely recurring
            const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
            if (avgInterval >= 25 && avgInterval <= 40) {
              // Sort by date descending and get the latest transaction
              transList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              recurring.push(transList[0]);
            }
          }
        });

        resolve(recurring);
      }, 400); // Simulate processing delay
    });
  }

  /**
   * Predicts next month's spending
   */
  static predictNextMonthSpending(transactions: Transaction[]): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const monthlySpending = this.calculateMonthlySpending(transactions);
        const avgMonthly = monthlySpending.reduce((sum, val) => sum + val, 0) / monthlySpending.length;
        
        // Predict with slight increase (5%)
        resolve(avgMonthly * 1.05);
      }, 300); // Simulate processing delay
    });
  }

  /**
   * Calculates monthly spending history
   */
  private static calculateMonthlySpending(transactions: Transaction[]): number[] {
    // Group by month
    const monthlyTotals = new Map<string, number>();
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-MM
      
      const current = monthlyTotals.get(monthKey) || 0;
      monthlyTotals.set(monthKey, current + Math.abs(transaction.amount));
    });
    
    return Array.from(monthlyTotals.values());
  }

  /**
   * Checks if description matches any of the keywords
   */
  private static matchesKeyword(description: string, keywords: string[]): boolean {
    return keywords.some(keyword => description.includes(keyword));
  }
}