<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import type { AdminUser } from '~/types/api/admin'

useKunDisableSeo('用户管理')

const pageData = reactive({
  page: 1,
  limit: 100
})

const { data, status } = await useFetch('/api/admin/user', {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

const searchResult = ref<AdminUser[]>([])
const searchQuery = ref('')
const isSearching = ref(false)
const displayUsers = computed<AdminUser[]>(() =>
  searchQuery.value.trim()
    ? searchResult.value
    : data.value
      ? data.value.users
      : []
)

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResult.value = []
    return
  }
  isSearching.value = true
  const res = await $fetch(`/api/admin/user/search`, {
    method: 'GET',
    query: { q: searchQuery.value.split(' ') }
  })
  isSearching.value = false

  searchResult.value = res
}

watchDebounced(
  () => searchQuery.value,
  () => {
    handleSearch()
  },
  { debounce: 500, maxWait: 1000 }
)
</script>

<template>
  <KunCard
    v-if="data"
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
  >
    <KunHeader
      name="用户管理"
      description="您可以在此处管理所有的网站用户, 有时会有广告或者发真人色情的用户, 这时直接将该用户删除即可, 目前的管理系统仅临时使用, 非必要请不要删除用户"
    >
      <template #endContent>
        <div class="space-y-3">
          <KunInput
            v-model="searchQuery"
            type="text"
            placeholder="输入用户名以搜索用户"
          />

          <div class="text-default-600 mt-4 flex items-center gap-4 text-sm">
            <span v-if="!searchQuery.trim()">
              {{ `总计 ${data?.totalCount || 0} 个用户` }}
            </span>
            <span v-else>{{ `搜索结果: ${searchResult.length} 个用户` }}</span>
          </div>
        </div>
      </template>
    </KunHeader>

    <div class="mt-6 flex flex-col gap-3">
      <AdminUserCard
        v-for="(user, index) in displayUsers"
        :key="index"
        :user="user"
      />
    </div>

    <KunNull
      v-if="!isSearching && !displayUsers.length && searchQuery.trim()"
    />

    <KunLoading v-if="isSearching" />

    <KunPagination
      v-if="data.totalCount > pageData.limit && !searchQuery.trim()"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </KunCard>
</template>
