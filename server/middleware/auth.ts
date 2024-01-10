export default defineEventHandler((event) => {
  const payload = getCookieTokenInfo(event)
  const isNavigateToLogin = getCookie(event, 'kungalgame-is-navigate-to-login')

  if (!payload && !isNavigateToLogin) {
    setResponseStatus(event, 205)
    setCookie(event, 'kungalgame-is-navigate-to-login', '1')
  }
})
