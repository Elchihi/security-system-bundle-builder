import { useState } from 'react'
import steps from '../data/steps.json'
import products from '../data/products.json'
import AccordionStep from './AccordionStep'
import ProductCard from './ProductCard'

const cameraProducts = products.filter(
  (product) => product.stepId === 'cameras',
)

function BundleBuilder() {
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

  function renderStepContent(step) {
    if (step.id === 'cameras') {
      return (
        <div className="products-grid">
          {cameraProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )
    }

    return (
      <p className="accordion-step__placeholder">
        {step.title} content will be added here.
      </p>
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
              selectedCount={0}
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