import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import InstructionModal from '../modals/InstructionModal'
import { HELP_CONTENT, UPLOAD_LABELS } from '../../../constants/helpContent'
import { useLanguage } from '@/hooks/use-language'

function UploadSection({
  uploading,
  message,
  handleFileUpload,
  handleClearData
}) {
  const { t } = useLanguage()
  const [showAmexHelp, setShowAmexHelp] = useState(false)
  const [showAppleHelp, setShowAppleHelp] = useState(false)

  const handleOpenAmexHelp = useCallback(() => setShowAmexHelp(true), [])
  const handleCloseAmexHelp = useCallback(() => setShowAmexHelp(false), [])
  const handleOpenAppleHelp = useCallback(() => setShowAppleHelp(true), [])
  const handleCloseAppleHelp = useCallback(() => setShowAppleHelp(false), [])

  const amexSteps = t.transactionParser.helpContent.amex.steps.map((step, index) => ({
    ...step,
    image: HELP_CONTENT.amex.steps[index]?.image || null
  }))

  const appleSteps = t.transactionParser.helpContent.apple.steps.map((step, index) => ({
    ...step,
    image: HELP_CONTENT.apple.steps[index]?.image || null
  }))

  return (
    <section className="upload-section">
      <div className="upload-controls">
        <label className="upload-btn" aria-busy={uploading}>
          {uploading ? t.transactionParser.uploading : t.transactionParser.uploadButton}
          <input
            type="file"
            accept=".csv,.pdf"
            onChange={handleFileUpload}
            disabled={uploading}
            multiple
            hidden
            aria-label={t.transactionParser.uploadDesc}
          />
        </label>
        <button
          className="clear-btn"
          onClick={handleClearData}
          aria-label={t.transactionParser.clearData}
        >
          {t.transactionParser.clearData}
        </button>
      </div>

      <div className="upload-note-row">
        <p className="upload-note">{t.transactionParser.notes.amex}</p>
        <button
          type="button"
          className="info-btn"
          onClick={handleOpenAmexHelp}
          aria-label={UPLOAD_LABELS.amexAriaLabel}
          aria-haspopup="dialog"
        >
          <span aria-hidden="true">i</span>
        </button>
      </div>

      <div className="upload-note-row">
        <p className="upload-note">{t.transactionParser.notes.apple}</p>
        <button
          type="button"
          className="info-btn"
          onClick={handleOpenAppleHelp}
          aria-label={UPLOAD_LABELS.appleAriaLabel}
          aria-haspopup="dialog"
        >
          <span aria-hidden="true">i</span>
        </button>
      </div>

      <div className="upload-note-row">
        <p className="upload-note">{t.transactionParser.notes.usbank}</p>
      </div>

      <InstructionModal
        isOpen={showAmexHelp}
        onClose={handleCloseAmexHelp}
        title={t.transactionParser.helpContent.amex.title}
        steps={amexSteps}
      />

      <InstructionModal
        isOpen={showAppleHelp}
        onClose={handleCloseAppleHelp}
        title={t.transactionParser.helpContent.apple.title}
        steps={appleSteps}
      />

      {message.text && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`message ${message.type}`}
        >
          {message.text}
        </div>
      )}
    </section>
  )
}

UploadSection.propTypes = {
  uploading: PropTypes.bool.isRequired,
  message: PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.oneOf(['success', 'error', null])
  }).isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  handleClearData: PropTypes.func.isRequired
}

export default React.memo(UploadSection)
