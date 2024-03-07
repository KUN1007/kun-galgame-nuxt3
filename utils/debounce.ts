/*
 * Debounce function that takes a function and a delay time as parameters
 */
export const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  time: number
): ((...args: Parameters<F>) => void) => {
  let timeoutID: NodeJS.Timeout | null = null

  return function (...args: Parameters<F>) {
    if (timeoutID !== null) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      fn(...args)
    }, time)
  }
}
