import { useState } from 'react'
import products from './data/products.json'
import BundleBuilder from './components/BundleBuilder'
import ReviewPanel from './components/ReviewPanel'
import {
  createInitialActiveVariants,
  getItemKey,
} from './utils/bundle'
import defaultBundle from './data/defaultBundle.json'
import './App.css'

function App() {
  const [quantities, setQuantities] = useState(
  () => ({ ...defaultBundle.quantities }),
)

  const [activeVariants, setActiveVariants] = useState(() =>
    createInitialActiveVariants(products),
  )

  function handleVariantChange(productId, variantId) {
    setActiveVariants((currentVariants) => ({
      ...currentVariants,
      [productId]: variantId,
    }))
  }

 function handleQuantityChange(productId, variantId, nextQuantity) {
  const product = products.find(
    (currentProduct) => currentProduct.id === productId,
  )

  const maxQuantity = product?.maxQuantity ?? 10
  const safeQuantity = Math.min(
    maxQuantity,
    Math.max(0, nextQuantity),
  )

  const itemKey = getItemKey(productId, variantId)

  setQuantities((currentQuantities) => {
    const nextQuantities = { ...currentQuantities }

    if (safeQuantity === 0) {
      delete nextQuantities[itemKey]
    } else {
      nextQuantities[itemKey] = safeQuantity
    }

    return nextQuantities
  })
}

  return (
    <main className="app">
      <div className="app__layout">
        <BundleBuilder
          products={products}
          quantities={quantities}
          activeVariants={activeVariants}
          onVariantChange={handleVariantChange}
          onQuantityChange={handleQuantityChange}
        />

        <ReviewPanel
          products={products}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
        />
      </div>
    </main>
  )
}

export default App