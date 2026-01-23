import React from 'react'
import { formatCurrency, getCategoryClassName } from '../../../utils/formatters'
import { useLanguage } from '@/hooks/use-language'

function SummarySection({ summary, selectedCategory, setSelectedCategory }) {
  const { t } = useLanguage()

  return (
    <section className="summary-section">
      <h2>{t.transactionParser.summary.title}</h2>
      <div className="totals-container">
        <div className="total-card">
          <span>{t.transactionParser.summary.totalSpent}</span>
          <span className="total-amount">{formatCurrency(summary.total_charges || summary.grand_total)}</span>
        </div>
        {summary.total_credits > 0 && (
          <div className="total-card credit-card">
            <span>{t.transactionParser.summary.totalCredits}</span>
            <span className="credit-amount">{formatCurrency(summary.total_credits)}</span>
          </div>
        )}
        {summary.total_credits > 0 && (
          <div className="total-card net-card">
            <span>{t.transactionParser.summary.netSpending}</span>
            <span className="net-amount">{formatCurrency(summary.net_spending)}</span>
          </div>
        )}
      </div>
      <div className="categories-grid">
        {summary.categories.map((cat) => (
          <div
            key={cat.category}
            className={`category-card category-card-${getCategoryClassName(cat.category)} ${selectedCategory === cat.category ? 'selected' : ''}`}
            onClick={() => setSelectedCategory(cat.category)}
          >
            <h3>{cat.category}</h3>
            <p className="amount">{formatCurrency(cat.total)}</p>
            <p className="count">{cat.count} {t.transactionParser.summary.transactionCount}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default React.memo(SummarySection)
