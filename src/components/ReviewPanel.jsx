import {
  buildSelectedItems,
  calculateBundleTotals,
} from '../utils/bundle'
import ReviewItem from './ReviewItem'
import './ReviewPanel.css'

const reviewSections = [
  {
    id: 'cameras',
    title: 'Cameras',
  },
  {
    id: 'sensors',
    title: 'Sensors',
  },
  {
    id: 'accessories',
    title: 'Accessories',
  },
  {
    id: 'plan',
    title: 'Plan',
  },
]

function ReviewPanel({
  products,
  quantities,
  onQuantityChange,
}) {
  const selectedItems = buildSelectedItems(
    products,
    quantities,
  )

  const populatedSections = reviewSections
    .map((section) => ({
      ...section,
      items: selectedItems.filter(
        (item) => item.category === section.id,
      ),
    }))
    .filter((section) => section.items.length > 0)

  const {
    currentTotal,
    originalTotal,
    savings,
  } = calculateBundleTotals(selectedItems)

  const monthlyPayment = Number(
    (currentTotal / 10).toFixed(2),
  )

  function handleCheckout() {
    window.alert(
      `Your security system is ready. Total: $${currentTotal.toFixed(2)}`,
    )
  }

  return (
    <aside
      className="review-panel"
      aria-labelledby="review-panel-title"
    >
      <header className="review-panel__header">
        <span className="review-panel__eyebrow">
          Review
        </span>

        <h2 id="review-panel-title">
          Your security system
        </h2>

        <p>
          Review your personalized protection system
          designed to keep what matters most safe.
        </p>
      </header>

      {populatedSections.length > 0 ? (
        <div className="review-panel__sections">
          {populatedSections.map((section) => (
            <section
              className="review-panel__section"
              key={section.id}
              aria-labelledby={`review-${section.id}`}
            >
              <h3
                id={`review-${section.id}`}
                className="review-panel__section-title"
              >
                {section.title}
              </h3>

              <div className="review-panel__items">
                {section.items.map((item) => (
                  <ReviewItem
                    key={item.key}
                    item={item}
                    onQuantityChange={onQuantityChange}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="review-panel__empty">
          Your selected products will appear here.
        </p>
      )}

      <section
        className="review-panel__shipping"
        aria-label="Shipping"
      >
        <img
          src="/images/ui/fast-shipping.png"
          alt=""
        />

        <span className="review-panel__shipping-name">
          Fast Shipping
        </span>

        <span className="review-panel__shipping-price">
          <del>$5.99</del>
          <strong>FREE</strong>
        </span>
      </section>

      <section className="review-panel__summary">
        <div className="review-panel__summary-main">
          <img
            className="review-panel__guarantee"
            src="/images/ui/satisfaction-guarantee.png"
            alt="100% satisfaction guarantee"
          />

          <div className="review-panel__totals">
            {currentTotal > 0 && (
              <span className="review-panel__financing">
                As low as ${monthlyPayment.toFixed(2)}/mo
              </span>
            )}

            <div className="review-panel__total-row">
              {savings > 0 && (
                <del>${originalTotal.toFixed(2)}</del>
              )}

              <strong>
                ${currentTotal.toFixed(2)}
              </strong>
            </div>
          </div>
        </div>

        {savings > 0 && (
          <p className="review-panel__savings">
            Congrats! You&apos;re saving $
            {savings.toFixed(2)} on your security bundle!
          </p>
        )}

        <button
          className="review-panel__checkout"
          type="button"
          disabled={selectedItems.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </section>
    </aside>
  )
}

export default ReviewPanel