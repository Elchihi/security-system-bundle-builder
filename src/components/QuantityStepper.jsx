import './QuantityStepper.css'

function QuantityStepper({
  value,
  label,
  onDecrease,
  onIncrease,
  min = 0,
  max = 10,
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
        disabled={value <= min}
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
        disabled={value >= max}
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  )
}

export default QuantityStepper