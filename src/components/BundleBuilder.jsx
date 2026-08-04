import { useState } from 'react'
import steps from '../data/steps.json'
import AccordionStep from './AccordionStep'

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
              <p className="accordion-step__placeholder">
                {step.title} content will be added here.
              </p>
            </AccordionStep>
          )
        })}
      </div>
    </section>
  )
}

export default BundleBuilder