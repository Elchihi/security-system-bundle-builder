function AccordionStep({
  step,
  isOpen,
  selectedCount,
  onToggle,
  onNext,
  children,
}) {
  const panelId = `step-panel-${step.id}`
  const hasSelection = selectedCount > 0

  return (
    <section className={`accordion-step${isOpen ? ' is-open' : ''}`}>
      <button
        className="accordion-step__header"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="accordion-step__details">
          <span className="accordion-step__number">
            STEP {step.number} OF 4
          </span>

          <span className="accordion-step__title-row">
            <span
              className={`accordion-step__icon${
                hasSelection ? ' is-complete' : ''
              }`}
              aria-hidden="true"
            />

            <span className="accordion-step__title">
              {step.title}
            </span>
          </span>
        </span>

        <span className="accordion-step__status">
          <span className="accordion-step__selected">
            {selectedCount} selected
          </span>

          <span
            className={`accordion-step__chevron${
              isOpen ? ' is-open' : ''
            }`}
            aria-hidden="true"
          />
        </span>
      </button>

      <div
        id={panelId}
        className="accordion-step__panel"
        hidden={!isOpen}
      >
        <div className="accordion-step__content">
          {children}
        </div>

        {step.nextLabel && (
          <button
            className="accordion-step__next"
            type="button"
            onClick={onNext}
          >
            Next: {step.nextLabel}
          </button>
        )}
      </div>
    </section>
  )
}

export default AccordionStep