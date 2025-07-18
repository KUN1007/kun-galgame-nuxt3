<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { KUN_GALGAME_OFFICIAL_LANGUAGE_MAP } from '~/constants/galgameOfficial'
import type { GalgameOfficialItem } from '~/types/api/galgame-official'

const pageData = reactive({
  page: 1,
  limit: 100
})

const { data, status } = await useFetch(`/api/galgame-official`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

const searchResult = ref<GalgameOfficialItem[]>([])
const searchQuery = ref('')
const isSearching = ref(false)
const displayOfficials = computed(() =>
  searchQuery.value.trim() ? searchResult.value : data.value!.officials
)

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResult.value = []
    return
  }
  isSearching.value = true
  const res = await $fetch(`/api/galgame-official/search`, {
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

const getOfficialCategoryInfo = (category: string) => {
  switch (category) {
    case 'company':
      return {
        text: '公司',
        class: 'bg-primary-100 text-primary-800'
      }
    case 'individual':
      return {
        text: '个人',
        class: 'bg-success-100 text-success-800'
      }
    case 'amateur':
      return {
        text: '同人',
        class: 'bg-secondary-100 text-secondary-800'
      }
    default:
      return {
        text: category,
        class: 'bg-default-100 text-default-800'
      }
  }
}
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    content-class="space-y-6"
  >
    <KunHeader name="会社列表" description="Galgame 会社列表">
      <template #endContent>
        <div>
          <KunInput
            v-model="searchQuery"
            type="text"
            placeholder="搜索会社名称、描述或别名..."
          />

          <div class="text-default-600 mt-4 flex items-center gap-4 text-sm">
            <span v-if="!searchQuery.trim()">
              {{ `总计 ${data?.totalCount || 0} 个会社` }}
            </span>
            <span v-else>{{ `搜索结果: ${searchResult.length} 个会社` }}</span>
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
        v-for="official in displayOfficials"
        :key="official.id"
        :to="`/galgame-official/${official.id}`"
      >
        <h3 class="text-default-900 font-semibold">
          {{ official.name }}
          <KunBadge size="xs">
            {{ `+ ${official.galgameCount}` }}
          </KunBadge>
        </h3>
        <div class="flex items-center gap-x-2">
          <KunBadge
            size="xs"
            class-name="rounded-md"
            :color="
              official.category === 'company'
                ? 'primary'
                : official.category === 'individual'
                  ? 'secondary'
                  : 'success'
            "
          >
            {{ getOfficialCategoryInfo(official.category).text }}
          </KunBadge>
          <span class="text-default-500 dark:text-default-400 text-xs">
            {{
              KUN_GALGAME_OFFICIAL_LANGUAGE_MAP[official.lang] || official.lang
            }}
          </span>
        </div>
        <div
          v-if="official.alias.length"
          class="text-default-500 flex flex-wrap gap-2"
        >
          <KunBadge
            size="xs"
            color="success"
            v-for="(a, index) in official.alias"
            :key="index"
          >
            {{ a }}
          </KunBadge>
        </div>
      </KunCard>
    </div>

    <KunNull
      v-if="!isSearching && !displayOfficials.length && searchQuery.trim()"
    />

    <KunLoading v-if="isSearching" />

    <KunPagination
      v-if="data && data.totalCount > pageData.limit && !searchQuery.trim()"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </KunCard>
</template>
