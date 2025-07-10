export const scrollPage = (rid: number) => {
  let timeout: NodeJS.Timeout | null = null
  const element = document.querySelector(`[id^="${rid}"]`) as HTMLElement

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    element.classList.add(
      'outline-2',
      'outline-offset-2',
      'outline-primary',
      'rounded-lg'
    )

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      element.classList.remove(
        'outline-2',
        'outline-offset-2',
        'outline-primary',
        'rounded-lg'
      )
    }, 3000)
    return true
  } else {
    return false
  }
}

export const scrollToTOCElement = (id: string) => {
  let timeout: NodeJS.Timeout | null = null
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    element.classList.add(
      'outline-2',
      'outline-offset-2',
      'outline-primary',
      'rounded-lg'
    )

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      element.classList.remove(
        'outline-2',
        'outline-offset-2',
        'outline-primary',
        'rounded-lg'
      )
    }, 3000)
  }
}
