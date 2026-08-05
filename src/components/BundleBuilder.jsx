import { useState } from 'react'
import steps from '../data/steps.json'
import { getProductTotalQuantity } from '../utils/bundle'
import AccordionStep from './AccordionStep'
import ProductCard from './ProductCard'

function BundleBuilder({
  products,
  quantities,
  activeVariants,
  onVariantChange,
  onQuantityChange,
}) {
  const [activeStepId, setActiveStepId] = useState(steps[0].id)

  function handleToggle(stepId) {
    setActiveStepId((currentStepId) =>
      currentStepId === stepId ? null : stepId,
    )
  }

  function handleNext(currentIndex) {
    const nextStep = steps[currentIndex + 1]

    if (nextStep) {
      setActiveStepId(nextStep.id)
    }
  }

  function getSelectedCount(stepId) {
    return products.filter(
      (product) =>
        product.stepId === stepId &&
        getProductTotalQuantity(product, quantities) > 0,
    ).length
  }

  function renderStepContent(step) {
    const stepProducts = products.filter(
      (product) => product.stepId === step.id,
    )

    if (stepProducts.length === 0) {
      return (
        <p className="accordion-step__placeholder">
          {step.title} content will be added here.
        </p>
      )
    }

    return (
      <div className="products-grid">
        {stepProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantities={quantities}
            activeVariantId={activeVariants[product.id]}
            onVariantChange={onVariantChange}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="bundle-builder">
      <header className="bundle-builder__mobile-header">
        <h1>Let&apos;s get started!</h1>
      </header>

      <div className="bundle-builder__steps">
        {steps.map((step, index) => {
          const isOpen = activeStepId === step.id

          return (
            <AccordionStep
              key={step.id}
              step={step}
              isOpen={isOpen}
              selectedCount={getSelectedCount(step.id)}
              onToggle={() => handleToggle(step.id)}
              onNext={() => handleNext(index)}
            >
              {renderStepContent(step)}
            </AccordionStep>
          )
        })}
      </div>
    </section>
  )
}

export default BundleBuilder