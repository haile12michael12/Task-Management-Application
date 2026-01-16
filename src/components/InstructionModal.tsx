import React, { useEffect, useRef, useId } from 'react';

interface InstructionStep {
  text: string;
  image?: string;
  altText?: string;
}

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  steps: InstructionStep[];
}

function InstructionModal({ isOpen, onClose, title, steps }: InstructionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  // Keep onClose ref updated without triggering effect re-runs
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Handle all modal behavior in a single effect
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    // Capture trigger element when modal opens
    if (!triggerRef.current) {
      triggerRef.current = document.activeElement as HTMLElement;
    }

    // Get all focusable elements
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when modal opens
    firstElement?.focus();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      // Trap focus within modal
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';

      // Return focus to trigger element
      if (triggerRef.current) {
        triggerRef.current.focus();
        triggerRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleOverlayClick}
    >
      <div className="modal" ref={modalRef}>
        <div className="modal-header">
          <h3 id={titleId}>{title}</h3>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close instructions"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <ol className="pdf-instructions">
            {steps.map((step, index) => (
              <li key={index}>
                <p dangerouslySetInnerHTML={{ __html: step.text }} />
                {step.image && (
                  <img
                    src={step.image}
                    alt={step.altText}
                    className="instruction-img"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      console.warn(`Failed to load image: ${step.altText}`);
                    }}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default InstructionModal;