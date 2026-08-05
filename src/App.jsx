import { useEffect, useState } from 'react'
import defaultBundle from './data/defaultBundle.json'
import BundleBuilder from './components/BundleBuilder'
import ReviewPanel from './components/ReviewPanel'
import { fetchProducts } from './services/productsApi'
import {
  createInitialActiveVariants,
  getItemKey,
} from './utils/bundle'
import {
  clearSavedBundle,
  loadSavedBundle,
  saveBundle,
} from './utils/storage'
import './App.css'

function createInitialBundle() {
  const savedBundle = loadSavedBundle()

  return {
    quantities:
      savedBundle?.quantities ??
      { ...defaultBundle.quantities },

    activeVariants:
      savedBundle?.activeVariants ?? {},
  }
}

function App() {
  const [initialBundle] = useState(
    createInitialBundle,
  )

  const [products, setProducts] = useState([])

  const [catalogStatus, setCatalogStatus] =
    useState('loading')

  const [catalogError, setCatalogError] =
    useState('')

  const [catalogRequestId, setCatalogRequestId] =
    useState(0)

  const [quantities, setQuantities] = useState(
    () => ({ ...initialBundle.quantities }),
  )

  const [activeVariants, setActiveVariants] =
    useState(
      () => ({
        ...initialBundle.activeVariants,
      }),
    )

  const [saveMessage, setSaveMessage] =
    useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProductCatalog() {
      try {
        const catalog = await fetchProducts({
          signal: controller.signal,
        })

        setProducts(catalog)

        setActiveVariants((currentVariants) => ({
          ...createInitialActiveVariants(catalog),
          ...currentVariants,
        }))

        setCatalogStatus('success')
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setCatalogError(
          error.message ||
            'Unable to load the product catalog.',
        )

        setCatalogStatus('error')
      }
    }

    loadProductCatalog()

    return () => {
      controller.abort()
    }
  }, [catalogRequestId])

  function handleRetryCatalog() {
    setCatalogError('')
    setCatalogStatus('loading')

    setCatalogRequestId(
      (currentRequestId) =>
        currentRequestId + 1,
    )
  }

  function handleVariantChange(
    productId,
    variantId,
  ) {
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

  function handleClearSavedBundle() {
    const didClear = clearSavedBundle()

    setSaveMessage(
      didClear
        ? 'Saved system removed. Your current selections have not changed.'
        : 'The saved system could not be removed. Please try again.',
    )
  }

  return (
    <main className="app">
      {catalogStatus === 'loading' && (
        <section
          className="app__catalog-status"
          role="status"
          aria-live="polite"
        >
          <span
            className="app__loading-spinner"
            aria-hidden="true"
          />

          <h1>Loading your security system</h1>

          <p>
            We&apos;re preparing the product
            catalog.
          </p>
        </section>
      )}

      {catalogStatus === 'error' && (
        <section
          className="app__catalog-status"
          role="alert"
        >
          <h1>We couldn&apos;t load the products</h1>

          <p>{catalogError}</p>

          <button
            className="app__retry-button"
            type="button"
            onClick={handleRetryCatalog}
          >
            Try again
          </button>
        </section>
      )}

      {catalogStatus === 'success' && (
        <div className="app__layout">
          <BundleBuilder
            products={products}
            quantities={quantities}
            activeVariants={activeVariants}
            onVariantChange={
              handleVariantChange
            }
            onQuantityChange={
              handleQuantityChange
            }
          />

          <ReviewPanel
            products={products}
            quantities={quantities}
            onQuantityChange={
              handleQuantityChange
            }
            onSave={handleSaveBundle}
            saveMessage={saveMessage}
            onClearSave={
              handleClearSavedBundle
            }
          />
        </div>
      )}
    </main>
  )
}

export default App