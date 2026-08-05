import './QuantityStepper.css'

function QuantityStepper({
  value,
  label,
  onDecrease,
  onIncrease,
}) {
  return (
    <div
      className="quantity-stepper"
      aria-label={`${label} quantity`}
    >
      <button
        className="quantity-stepper__button"
        type="button"
        aria-label={`Decrease ${label} quantity`}
        disabled={value === 0}
        onClick={onDecrease}
      >
        −
      </button>

      <output
        className="quantity-stepper__value"
        aria-live="polite"
      >
        {value}
      </output>

      <button
        className="quantity-stepper__button"
        type="button"
        aria-label={`Increase ${label} quantity`}
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  )
}

export default QuantityStepper