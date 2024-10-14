import Cookies from 'js-cookie'
import type { FetchContext, FetchResponse } from 'ofetch'

interface ResponseMap {
  blob: Blob
  text: string
  arrayBuffer: ArrayBuffer
  stream: ReadableStream<Uint8Array>
}
type ResponseType = keyof ResponseMap | 'json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KunOnResponseContext = FetchContext<any, ResponseType> & {
  response: FetchResponse<ResponseType>
}
type KunOnResponseErrorContext<R extends ResponseType = 'json'> =
  FetchContext & {
    response: FetchResponse<R>
  }

export const onResponse = (context: KunOnResponseContext) => {
  if (context.response.status === 205) {
    const navigateCookie = Cookies.get('kungalgame-is-navigate-to-login')
    if (!navigateCookie) {
      usePersistUserStore().$reset()
      useMessage(10250, 'error', 7777)

      const nuxt = useNuxtApp()
      navigateTo(nuxt.$localePath('/login'))
      Cookies.set('kungalgame-is-navigate-to-login', 'navigated')
      return
    }
  }

  if (context.response.status === 233) {
    kungalgameErrorHandler(context.response.headers.get('Kun-Error') || '')
  }
}

const onResponseError = (context: KunOnResponseErrorContext) => {}

export const kungalgameResponseHandler = { onResponse, onResponseError }
