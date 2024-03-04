/**
 * Throttle function
 * Executes the function only once within a specified time period,
 * regardless of how many times it's triggered.
 */

/**
 * @param {T} executeCallback - The code to apply the throttle function to.
 * @param {number} delay - Throttle time interval.
 * @param {T | undefined} delayedCallback - Callback generated when the execute function is executed before the throttle time interval.
 */
export function throttle<T extends (...args: any[]) => void>(
  executeCallback: T,
  delay: number,
  delayedCallback?: T | undefined
) {
  let lastExecution = 0
  let timeout: NodeJS.Timeout | null = null

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now()

    if (!lastExecution || now - lastExecution >= delay) {
      executeCallback(...args)
      lastExecution = now
    } else if (!timeout && delayedCallback) {
      delayedCallback(...args)
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
    }
  }

  return throttled as (...args: Parameters<T>) => void
}
