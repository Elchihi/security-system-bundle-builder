import { getItemKey, getProductTotalQuantity } from '../utils/bundle'
import QuantityStepper from './QuantityStepper'
import './ProductCard.css'

function ProductCard({
  product,
  quantities,
  activeVariantId,
  onVariantChange,
  onQuantityChange,
}) {
  const hasBadge = Boolean(product.badge)
  const hasVariants = product.variants.length > 0

  const selectedVariantId = hasVariants
    ? activeVariantId ??
      product.defaultVariantId ??
      product.variants[0].id
    : null

  const activeItemKey = getItemKey(
    product.id,
    selectedVariantId,
  )

  const activeQuantity = quantities[activeItemKey] ?? 0

  const totalProductQuantity = getProductTotalQuantity(
    product,
    quantities,
  )

  const isSelected = totalProductQuantity > 0

  function handleDecrease() {
    onQuantityChange(
      product.id,
      selectedVariantId,
      activeQuantity - 1,
    )
  }

  function handleIncrease() {
    onQuantityChange(
      product.id,
      selectedVariantId,
      activeQuantity + 1,
    )
  }

  return (
    <article
      className={`product-card${isSelected ? ' is-selected' : ''}`}
    >
      {hasBadge && (
        <span className="product-card__badge">
          {product.badge}
        </span>
      )}

      <div className="product-card__image-container">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">
          {product.name}
        </h3>

        <p className="product-card__description">
          {product.description}
        </p>

        <a
          className="product-card__learn-more"
          href={product.learnMoreUrl}
          onClick={(event) => event.preventDefault()}
        >
          Learn More
        </a>

        {hasVariants && (
          <div
            className="product-card__variants"
            aria-label={`${product.name} color options`}
          >
            {product.variants.map((variant) => {
              const isActive =
                variant.id === selectedVariantId

              return (
                <button
                  className={`product-card__variant${
                    isActive ? ' is-active' : ''
                  }`}
                  key={variant.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() =>
                    onVariantChange(product.id, variant.id)
                  }
                >
                  <span
                    className="product-card__swatch"
                    style={{
                      backgroundColor: variant.swatch,
                    }}
                    aria-hidden="true"
                  />

                  <span>{variant.label}</span>
                </button>
              )
            })}
          </div>
        )}

        <div className="product-card__footer">
          <QuantityStepper
            value={activeQuantity}
            label={`${product.name}${
              selectedVariantId
                ? ` ${selectedVariantId}`
                : ''
            }`}
            max={product.maxQuantity ?? 10}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
          />

          <div className="product-card__pricing">
            {product.compareAtPrice !== null && (
              <span className="product-card__compare-price">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}

            <span className="product-card__price">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard