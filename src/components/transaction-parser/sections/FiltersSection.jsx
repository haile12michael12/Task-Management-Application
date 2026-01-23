import React from 'react'
import { useLanguage } from '@/hooks/use-language'

function FiltersSection({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedCategory,
  setSelectedCategory,
  categories,
  resetFilters
}) {
  const { t } = useLanguage()

  return (
    <section className="filters-section">
      <h2>{t.transactionParser.filters.title}</h2>
      <div className="filters">
        <div className="filter-group">
          <label>{t.transactionParser.filters.startDate}</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>{t.transactionParser.filters.endDate}</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>{t.transactionParser.filters.category}</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button className="reset-btn" onClick={resetFilters}>
          {t.transactionParser.filters.reset}
        </button>
      </div>
    </section>
  )
}

export default React.memo(FiltersSection)
