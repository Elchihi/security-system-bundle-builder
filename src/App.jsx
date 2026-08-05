import { useState } from 'react'
import products from './data/products.json'
import BundleBuilder from './components/BundleBuilder'
import ReviewPanel from './components/ReviewPanel'
import {
  createInitialActiveVariants,
  getItemKey,
} from './utils/bundle'
import './App.css'

function App() {
  const [quantities, setQuantities] = useState({})

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
    const itemKey = getItemKey(productId, variantId)
    const safeQuantity = Math.max(0, nextQuantity)

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