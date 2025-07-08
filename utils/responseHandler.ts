import Cookies from 'js-cookie'
import type { FetchContext, FetchResponse } from 'ofetch'

interface KunErrorData {
  code: number
  message: string
}

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

export const onResponse = (context: KunOnResponseContext) => {}

const onResponseError = async (context: KunOnResponseErrorContext) => {
  const errorData = context.response?._data?.data as KunErrorData | undefined

  if (!errorData) {
    useMessage('网络请求失败，请稍后重试', 'error')
    return
  }

  const { code, message } = errorData

  if (code === 205) {
    const navigateCookie = Cookies.get('kungalgame-is-navigate-to-login')
    const userStore = usePersistUserStore()

    if (!navigateCookie && userStore.uid) {
      userStore.$reset()

      useMessage(message || '登录已失效，请重新登录', 'error', 7777)

      Cookies.set('kungalgame-is-navigate-to-login', 'navigated', {
        expires: 1 / 1440
      })

      await navigateTo('/login')
      return
    }
  }

  if (code === 233) {
    useMessage(message, 'error')
  }
}

export const kungalgameResponseHandler = { onResponse, onResponseError }
