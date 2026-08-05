import { useState } from 'react'
import products from './data/products.json'
import defaultBundle from './data/defaultBundle.json'
import BundleBuilder from './components/BundleBuilder'
import ReviewPanel from './components/ReviewPanel'
import {
  createInitialActiveVariants,
  getItemKey,
} from './utils/bundle'
import {
  loadSavedBundle,
  saveBundle,
} from './utils/storage'
import './App.css'

const defaultActiveVariants =
  createInitialActiveVariants(products)

function createInitialBundle() {
  const savedBundle = loadSavedBundle()

  return {
    quantities:
      savedBundle?.quantities ??
      { ...defaultBundle.quantities },

    activeVariants: {
      ...defaultActiveVariants,
      ...(savedBundle?.activeVariants ?? {}),
    },
  }
}

function App() {
  const [initialBundle] = useState(
    createInitialBundle,
  )

  const [quantities, setQuantities] = useState(
    () => ({ ...initialBundle.quantities }),
  )

  const [activeVariants, setActiveVariants] =
    useState(
      () => ({ ...initialBundle.activeVariants }),
    )

  const [saveMessage, setSaveMessage] =
    useState('')

  function handleVariantChange(productId, variantId) {
    setSaveMessage('')

    setActiveVariants((currentVariants) => ({
      ...currentVariants,
      [productId]: variantId,
    }))
  }

  function handleQuantityChange(
    productId,
    variantId,
    nextQuantity,
  ) {
    const product = products.find(
      (currentProduct) =>
        currentProduct.id === productId,
    )

    const maxQuantity =
      product?.maxQuantity ?? 10

    const safeQuantity = Math.min(
      maxQuantity,
      Math.max(0, nextQuantity),
    )

    const itemKey = getItemKey(
      productId,
      variantId,
    )

    setSaveMessage('')

    setQuantities((currentQuantities) => {
      const nextQuantities = {
        ...currentQuantities,
      }

      if (safeQuantity === 0) {
        delete nextQuantities[itemKey]
      } else {
        nextQuantities[itemKey] =
          safeQuantity
      }

      return nextQuantities
    })
  }

  function handleSaveBundle() {
    const didSave = saveBundle({
      quantities,
      activeVariants,
    })

    setSaveMessage(
      didSave
        ? 'Your system has been saved.'
        : 'Your system could not be saved. Please try again.',
    )
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
          onSave={handleSaveBundle}
          saveMessage={saveMessage}
        />
      </div>
    </main>
  )
}

export default App