import { kungal } from '~/config/kungal'

export default defineNuxtPlugin(() => {
  if (!window) return

  const legitimateDomains = kungal.validDomain
  const currentHostname = window.location.hostname

  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction && !legitimateDomains.includes(currentHostname)) {
    window.location.href = `https://${legitimateDomains[0]}${window.location.pathname}${window.location.search}`
  }
})
