import Cookies from 'js-cookie'

export default defineNuxtPlugin((nuxtApp) => {
  const kunApiFetch = $fetch.create({
    baseURL: '/api',

    async onResponse({ request, response, options }) {
      if (response.status === 205) {
        if (import.meta.client) {
          const navigateCookie = Cookies.get('kungalgame-is-navigate-to-login')
          const userStore = usePersistUserStore()

          if (!navigateCookie && userStore.uid) {
            userStore.$reset()
            useMessage(10250, 'error', 7777)

            // 1min
            Cookies.set('kungalgame-is-navigate-to-login', 'navigated', {
              expires: 1 / 1440
            })

            await navigateTo('/login')
          }
        }
      }

      if (response.status === 233) {
        const errorHeader = response.headers.get('Kun-Error')
        if (errorHeader) {
          kungalgameErrorHandler(errorHeader)
        }
      }
    },

    async onResponseError({ request, response, options }) {
      if (response.status === 401) {
        if (import.meta.client) {
          console.error('Unauthorized access, redirecting to login.')
          await navigateTo('/login')
        }
      }
    }
  })

  return {
    provide: {
      kunApi: kunApiFetch
    }
  }
})
