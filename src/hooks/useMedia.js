import { useState, useEffect } from 'react'

// ================================================================================================

/**
 * Use media queries.
 * Example:
 const columnCount = useMedia(
   ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
   [5, 4, 3],
   2
   )
   */
const useMedia = (queries, values, defaultValue) => {
  // State update function
  const match = () => {
    // Get first media query that matches
    const query = queries.findIndex(q => matchMedia(q).matches)
    // Return related value or defaultValue if none
    return values[query] || defaultValue
  }

  // State and setter for current value
  const [value, set] = useState(match)

  useEffect(() => {
    // Update state on window resize
    // Usage of match function defined outside of useEffect ...
    // ... ensures that it has current values of arguments.
    const handler = () => set(match)
    window.addEventListener('resize', handler)
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handler)
  }, []) // Empty array ensures effect is only run on mount and unmount

  return value
}

// ================================================================================================

export default useMedia
