import { kungalgameErrorHandler } from './errorHandler'
import type { KUNError } from '~/server/utils/createResponse'

export const onRequestError = (response: KUNError) => {
  kungalgameErrorHandler(response.error)
}
