import Cookies from 'js-cookie'
import type { FetchContext, FetchResponse } from 'ofetch'

interface ResponseMap {
  blob: Blob
  text: string
  arrayBuffer: ArrayBuffer
  stream: ReadableStream<Uint8Array>
}
type ResponseType = keyof ResponseMap | 'json'

type KunOnResponseContext = FetchContext<unknown, ResponseType> & {
  response: FetchResponse<ResponseType>
}
type KunOnResponseErrorContext<R extends ResponseType = 'json'> =
  FetchContext & {
    response: FetchResponse<R>
  }

export const onResponse = (context: KunOnResponseContext) => {
  if (context.response.status === 205) {
    const navigateCookie = Cookies.get('kungalgame-is-navigate-to-login')
    const userStore = usePersistUserStore()

    if (!navigateCookie && userStore.uid) {
      userStore.$reset()
      useMessage(10250, 'error', 7777)

      Cookies.set('kungalgame-is-navigate-to-login', 'navigated')
      return navigateTo('/login')
    }
  }

  if (context.response.status === 233) {
    kungalgameErrorHandler(context.response.headers.get('Kun-Error') || '')
  }
}

const onResponseError = (_: KunOnResponseErrorContext) => {}

export const kungalgameResponseHandler = { onResponse, onResponseError }
