import { kungal } from '~/config/kungal'

export default defineNuxtPlugin(async () => {
  if (!window) return

  const legitimateDomains = kungal.validDomain
  const currentHostname = window.location.hostname

  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction && !legitimateDomains.includes(currentHostname)) {
    await navigateTo(
      `https://${legitimateDomains[0]}${window.location.pathname}${window.location.search}`,
      { external: true }
    )
  }
})
