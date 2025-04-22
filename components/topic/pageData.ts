export interface PageData {
  page: number
  limit: number
  sortField: 'time' | 'created' | 'views'
  sortOrder: 'asc' | 'desc'
  category: 'all' | 'galgame' | 'technique' | 'others'
}

export const pageData = reactive<PageData>({
  page: 1,
  limit: 24,
  sortField: 'time',
  sortOrder: 'desc',
  category: 'all'
})
