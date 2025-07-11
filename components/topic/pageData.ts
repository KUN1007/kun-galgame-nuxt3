export interface PageData {
  page: number
  limit: number
  sortField: 'status_update_time' | 'created' | 'view'
  sortOrder: 'asc' | 'desc'
  category: 'all' | 'galgame' | 'technique' | 'others'
}

export const pageData = reactive<PageData>({
  page: 1,
  limit: 24,
  sortField: 'status_update_time',
  sortOrder: 'desc',
  category: 'all'
})
