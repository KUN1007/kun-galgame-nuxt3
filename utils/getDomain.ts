interface GetDomainOptions {
  getRootDomain?: boolean
}

export const getDomain = (
  inputUrl: string,
  options: GetDomainOptions = {}
): string => {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return ''
  }

  let urlWithProtocol = inputUrl
  if (!/^https?:\/\//.test(inputUrl)) {
    urlWithProtocol = `https://${inputUrl}`
  }

  try {
    const urlObject = new URL(urlWithProtocol)
    const hostname = urlObject.hostname

    if (options.getRootDomain) {
      const parts = hostname.split('.')

      if (parts.length <= 2) {
        return hostname
      }

      const commonSLDs = new Set([
        'co',
        'com',
        'net',
        'org',
        'gov',
        'ac',
        'edu'
      ])
      const secondToLastPart = parts[parts.length - 2]

      if (commonSLDs.has(secondToLastPart)) {
        return parts.slice(-3).join('.')
      } else {
        return parts.slice(-2).join('.')
      }
    }

    return hostname
  } catch (error) {
    return ''
  }
}
