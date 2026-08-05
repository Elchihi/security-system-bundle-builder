import QuantityStepper from './QuantityStepper'
import './ReviewItem.css'

function ReviewItem({ item, onQuantityChange }) {
  const linePrice = item.price * item.quantity

  const lineCompareAtPrice =
    item.compareAtPrice !== null
      ? item.compareAtPrice * item.quantity
      : null

  const quantityLabel = item.variantLabel
    ? `${item.name} ${item.variantLabel}`
    : item.name

  const displayedPrice = item.priceLabel
    ? item.priceLabel
    : `$${linePrice.toFixed(2)}${
        item.billingPeriod
          ? `/${item.billingPeriod}`
          : ''
      }`

  function handleDecrease() {
    onQuantityChange(
      item.productId,
      item.variantId,
      item.quantity - 1,
    )
  }

  function handleIncrease() {
    onQuantityChange(
      item.productId,
      item.variantId,
      item.quantity + 1,
    )
  }

  return (
    <article className="review-item">
      <img
        className="review-item__image"
        src={item.image}
        alt=""
      />

      <div className="review-item__body">
        <div className="review-item__top">
          <div className="review-item__details">
            <h4 className="review-item__name">
              {item.name}
            </h4>

            {item.variantLabel && (
              <p className="review-item__variant">
                {item.variantLabel}
              </p>
            )}
          </div>

          <div className="review-item__pricing">
            {lineCompareAtPrice !== null && (
              <span className="review-item__compare-price">
                ${lineCompareAtPrice.toFixed(2)}
              </span>
            )}

            <span className="review-item__price">
              {displayedPrice}
            </span>
          </div>
        </div>

        <QuantityStepper
          value={item.quantity}
          label={quantityLabel}
          max={item.maxQuantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
        />
      </div>
    </article>
  )
}

export default ReviewItem