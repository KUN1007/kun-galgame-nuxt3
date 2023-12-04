/**
 * 自定义错误
 */

class KUNError extends Error {
  code: number
  error: unknown

  constructor(message: string, code: number, error?: unknown) {
    super(message)
    this.name = 'CustomError'
    this.code = code
    this.error = error
  }
}

export { KUNError }
