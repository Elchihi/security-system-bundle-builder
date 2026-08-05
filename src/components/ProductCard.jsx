import './ProductCard.css'

function ProductCard({ product }) {
  const hasBadge = Boolean(product.badge)
  const hasVariants = product.variants.length > 0

  return (
    <article className="product-card">
      {hasBadge && (
        <span className="product-card__badge">{product.badge}</span>
      )}

      <div className="product-card__image-container">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>

        <p className="product-card__description">
          {product.description}
        </p>

        <a
          className="product-card__learn-more"
          href={product.learnMoreUrl}
        >
          Learn More
        </a>

        {hasVariants && (
          <div
            className="product-card__variants"
            aria-label={`${product.name} color options`}
          >
            {product.variants.map((variant) => {
              const isDefaultVariant =
                variant.id === product.defaultVariantId

              return (
                <span
                  className={`product-card__variant${
                    isDefaultVariant ? ' is-active' : ''
                  }`}
                  key={variant.id}
                >
                  <span
                    className="product-card__swatch"
                    style={{ backgroundColor: variant.swatch }}
                    aria-hidden="true"
                  />

                  <span>{variant.label}</span>
                </span>
              )
            })}
          </div>
        )}

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
    </article>
  )
}

export default ProductCard