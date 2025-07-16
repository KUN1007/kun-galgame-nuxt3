export const getDomain = (inputUrl: string): string => {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return ''
  }

  let urlWithProtocol = inputUrl

  if (!/^https?:\/\//.test(inputUrl)) {
    urlWithProtocol = `https://${inputUrl}`
  }

  try {
    const urlObject = new URL(urlWithProtocol)
    return urlObject.hostname
  } catch (error) {
    return ''
  }
}
