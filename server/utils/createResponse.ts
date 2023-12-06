export interface KUNError {
  code: number
  error: number
}

export interface KUNSuccess<T> {
  code: number
  data: T
}

export const kunError = (code: number): KUNError => ({ code: 233, error: code })

export const kunSuccess = <T>(data: T): KUNSuccess<T> => ({
  code: 200,
  data,
})

export const isKunError = (object: any): object is KUNError =>
  'code' in object && 'error' in object

export const isKunSuccess = <T>(object: any): object is KUNSuccess<T> =>
  'code' in object && 'data' in object
