export const scrollPage = throttle((rid: number) => {
  let timeout: NodeJS.Timeout | null = null
  const childElement = document.querySelector(`#k${rid}`) as HTMLElement

  if (childElement) {
    childElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    childElement.classList.add('outline-2')

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      childElement.classList.remove('outline-2')
    }, 3000)
  } else {
    useMessage(10215, 'info')
  }
}, 1000)
