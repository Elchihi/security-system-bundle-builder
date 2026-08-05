const STORAGE_KEY = 'security-system-bundle'

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  )
}

export function loadSavedBundle() {
  try {
    const storedBundle = localStorage.getItem(STORAGE_KEY)

    if (!storedBundle) {
      return null
    }

    const parsedBundle = JSON.parse(storedBundle)

    const hasValidQuantities = isPlainObject(
      parsedBundle?.quantities,
    )

    const hasValidActiveVariants = isPlainObject(
      parsedBundle?.activeVariants,
    )

    if (
      !hasValidQuantities ||
      !hasValidActiveVariants
    ) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }

    return {
      quantities: parsedBundle.quantities,
      activeVariants: parsedBundle.activeVariants,
    }
  } catch (error) {
    console.error(
      'Failed to restore the saved bundle:',
      error,
    )

    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function saveBundle(bundle) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(bundle),
    )

    return true
  } catch (error) {
    console.error(
      'Failed to save the bundle:',
      error,
    )

    return false
  }
}

export function clearSavedBundle() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error(
      'Failed to remove the saved bundle:',
      error,
    )

    return false
  }
}