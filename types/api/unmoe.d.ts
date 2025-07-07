export interface UnmoeLog {
  id: number
  user: KunUser
  name: string
  description: KunLanguage
  result: string | number
  created: Date | string
}
