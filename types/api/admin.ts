export interface AdminOverStats {
  date: string
  [key: string]: number | string
}

export interface AdminUser extends KunUser {
  created: Date | string
  status: number
}
