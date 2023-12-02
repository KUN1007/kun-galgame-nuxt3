const localStorageString = () => {
  return localStorage.getItem('KUNGalgameSettings')
}

const getInitLanguage = () => {
  const userLanguage = navigator.language

  if (userLanguage.includes('en')) {
    return 'en'
  } else if (userLanguage.includes('zh')) {
    return 'zh'
  } else {
    return 'en'
  }
}

export const KUNGalgameLanguage = (): 'en' | 'zh' => {
  if (process.server) {
    return 'en'
  }
  const local = localStorageString()
  return local ? JSON.parse(local).showKUNGalgameLanguage : getInitLanguage()
}

export const mode = () => {
  if (process.server) {
    return ''
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ''
}
