export interface KunPatchResponse {
  id: number
  name: string
  // e.g. "vndb_id": "v19658",
  vndb_id: string
  banner: string
  introduction: string
  // e.g. "released": "2016-11-25",
  released: string
  status: number
  download: number
  view: number
  resource_update_time: Date
  type: string[]
  language: string[]
  engine: string[]
  platform: string[]
  user_id: number
  user: KunUser
  created: Date
  updated: Date
  resource: KunPatchResourceResponse[]
}

export interface KunPatchResourceResponse {
  id: number
  storage: 's3' | 'user'
  name: string
  model_name: string
  size: string
  code: string
  password: string
  note: string
  hash: string
  type: string[]
  language: string[]
  platform: string[]
  download: number
  status: number
  update_time: Date
  user_id: number
  patch_id: number
  created: Date
  user: KunUser
}

export interface HikariResponse {
  success: boolean
  message: string
  data: KunPatchResponse | null
}
