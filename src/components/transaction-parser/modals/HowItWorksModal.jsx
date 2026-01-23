import React, { useEffect, useRef, useId } from 'react'
import PropTypes from 'prop-types'
import privacyDiagram from '../../../assets/privacy-diagram.png'
import { useLanguage } from '@/hooks/use-language'

function HowItWorksModal({ isOpen, onClose }) {
  const { t } = useLanguage()
  const modalRef = useRef(null)
  const triggerRef = useRef(null)
  const onCloseRef = useRef(onClose)
  const titleId = useId()

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    const modal = modalRef.current
    if (!modal) return

    if (!triggerRef.current) {
      triggerRef.current = document.activeElement
    }

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    firstElement?.focus()
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''

      if (triggerRef.current) {
        triggerRef.current.focus()
        triggerRef.current = null
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleOverlayClick}
    >
      <div className="modal how-it-works-modal" ref={modalRef}>
        <div className="modal-header">
          <h3 id={titleId}>{t.transactionParser.howItWorks.title}</h3>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label={t.common.cancel}
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="how-it-works-content">
            <section>
              <h4>{t.transactionParser.howItWorks.privacyTitle}</h4>
              <p>
                {t.transactionParser.howItWorks.privacyDesc}
              </p>
              <div className="privacy-diagram">
                <img
                  src={privacyDiagram}
                  alt="Privacy diagram showing that only the green path is taken: upload statement, parse logic, show results. All red crossed-out paths (database, backend, monitoring, LLM) are not used."
                  onError={(e) => {
                    e.target.style.display = 'none'
                    console.warn('Privacy diagram image not found')
                  }}
                />
              </div>
            </section>

            <section>
              <h4>{t.transactionParser.howItWorks.stepsTitle}</h4>
              <ol className="how-it-works-list">
                <li>
                  {t.transactionParser.howItWorks.step1}
                </li>
                <li>
                  {t.transactionParser.howItWorks.step2}
                </li>
                <li>
                  {t.transactionParser.howItWorks.step3}
                </li>
                <li>
                  {t.transactionParser.howItWorks.step4}
                </li>
              </ol>
            </section>

            <section>
              <h4>Supported Banks</h4>
              <ul className="bank-list">
                <li>{t.transactionParser.notes.amex}</li>
                <li>{t.transactionParser.notes.usbank}</li>
                <li>{t.transactionParser.notes.apple}</li>
              </ul>
            </section>

            <section>
              <h4>Features</h4>
              <ul className="features-list">
                <li>Duplicate transaction detection</li>
                <li>Automatic merchant name normalization</li>
                <li>Date range filtering</li>
                <li>Category-based analysis</li>
                <li>Inline category editing</li>
                <li>Sortable transaction table</li>
              </ul>
            </section>

            <section className="privacy-notice">
              <p>
                <strong>Note:</strong> {t.transactionParser.howItWorks.privacyDesc}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

HowItWorksModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default HowItWorksModal
