export async function fetchProducts({
  signal,
} = {}) {
  const response = await fetch('/api/products', {
    signal,
  })

  if (!response.ok) {
    let errorMessage =
      'Unable to load the product catalog.'

    try {
      const errorData = await response.json()

      if (errorData?.message) {
        errorMessage = errorData.message
      }
    } catch {
      // Use the default message for non-JSON responses.
    }

    throw new Error(errorMessage)
  }

  const products = await response.json()

  if (!Array.isArray(products)) {
    throw new Error(
      'The product catalog response is invalid.',
    )
  }

  return products
}