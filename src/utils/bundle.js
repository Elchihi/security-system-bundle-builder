export function getItemKey(productId, variantId = null) {
  return variantId ? `${productId}:${variantId}` : productId
}

export function createInitialActiveVariants(products) {
  return products.reduce((activeVariants, product) => {
    if (product.variants.length === 0) {
      return activeVariants
    }

    activeVariants[product.id] =
      product.defaultVariantId ?? product.variants[0].id

    return activeVariants
  }, {})
}

export function getProductTotalQuantity(product, quantities) {
  if (product.variants.length === 0) {
    return quantities[product.id] ?? 0
  }

  return product.variants.reduce((total, variant) => {
    const itemKey = getItemKey(product.id, variant.id)
    const variantQuantity = quantities[itemKey] ?? 0

    return total + variantQuantity
  }, 0)
}


export function buildSelectedItems(products, quantities) {
  return products.flatMap((product) => {
    if (product.variants.length === 0) {
      const quantity = quantities[product.id] ?? 0

      if (quantity === 0) {
        return []
      }

      return [
        {
          key: product.id,
          productId: product.id,
          variantId: null,
          variantLabel: null,
          category: product.category,
          name: product.name,
          image: product.image,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          quantity,
        },
      ]
    }

    return product.variants.flatMap((variant) => {
      const itemKey = getItemKey(product.id, variant.id)
      const quantity = quantities[itemKey] ?? 0

      if (quantity === 0) {
        return []
      }

      return [
        {
          key: itemKey,
          productId: product.id,
          variantId: variant.id,
          variantLabel: variant.label,
          category: product.category,
          name: product.name,
          image: product.image,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          quantity,
        },
      ]
    })
  })
}