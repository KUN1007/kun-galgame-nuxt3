<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import type { GalgameTagItem } from '~/types/api/galgame-tag'

const pageData = reactive({
  page: 1,
  limit: 100
})

const { data, status } = await useFetch(`/api/galgame-tag`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

const searchResult = ref<GalgameTagItem[]>([])
const searchQuery = ref('')
const isSearching = ref(false)
const displayTags = computed(() =>
  searchQuery.value.trim() ? searchResult.value : data.value!.tags
)

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResult.value = []
    return
  }
  isSearching.value = true
  const res = await $fetch(`/api/galgame-tag/search`, {
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
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    content-class="space-y-6"
  >
    <KunHeader name="标签列表" description="Galgame 标签列表">
      <template #endContent>
        <div>
          <KunInput
            v-model="searchQuery"
            type="text"
            placeholder="搜索标签名称、描述或别名..."
          />

          <div class="text-default-600 mt-4 flex items-center gap-4 text-sm">
            <span v-if="!searchQuery.trim()">
              {{ `总计 ${data?.totalCount || 0} 个标签` }}
            </span>
            <span v-else>{{ `搜索结果: ${searchResult.length} 个标签` }}</span>
          </div>
        </div>
      </template>
    </KunHeader>

    <div
      class="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4"
    >
      <KunCard
        :is-transparent="true"
        :is-hoverable="true"
        :is-pressable="true"
        v-for="tag in displayTags"
        :key="tag.id"
        :to="`/galgame-tag/${tag.id}`"
      >
        <h3 class="text-default-900 font-semibold">
          <span
            :class="
              cn(
                'mr-1.5',
                tag.category === 'content' && 'text-primary',
                tag.category === 'sexual' && 'text-danger',
                tag.category === 'technical' && 'text-success'
              )
            "
          >
            #
          </span>
          {{ tag.name }}
        </h3>
        <KunBadge color="primary">
          {{ `包含 ${tag.galgameCount} 个 Galgame` }}
        </KunBadge>
      </KunCard>
    </div>

    <KunNull v-if="!isSearching && !displayTags.length && searchQuery.trim()" />

    <KunLoading v-if="isSearching" />

    <KunPagination
      v-if="data && data.totalCount > pageData.limit && !searchQuery.trim()"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </KunCard>
</template>
