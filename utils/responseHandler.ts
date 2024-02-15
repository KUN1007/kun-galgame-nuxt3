import type { FetchContext, FetchResponse } from 'ofetch'

interface ResponseMap {
  blob: Blob
  text: string
  arrayBuffer: ArrayBuffer
  stream: ReadableStream<Uint8Array>
}
type ResponseType = keyof ResponseMap | 'json'

type KunOnResponseContext = FetchContext<any, ResponseType> & {
  response: FetchResponse<ResponseType>
}
type KunOnResponseErrorContext<R extends ResponseType = 'json'> =
  FetchContext & {
    response: FetchResponse<R>
  }

export const onResponse = async (context: KunOnResponseContext) => {
  if (context.response.status === 205) {
    kungalgameStoreReset()
    useMessage(
      'Login expired, please login again',
      '登录过期, 请重新登陆',
      'error',
      7777
    )

    const localePath = useLocalePath()
    navigateTo(localePath('/login'))
    return
  }

  if (context.response.status === 233) {
    kungalgameErrorHandler(context.response.headers.get('Kun-Error') || '')
    return
  }
}

const onResponseError = (context: KunOnResponseErrorContext) => {}

export const kungalgameResponseHandler = { onResponse, onResponseError }
