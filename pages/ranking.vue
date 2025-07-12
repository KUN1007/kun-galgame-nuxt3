<script setup lang="ts">
import {
  topicSortItem,
  galgameSortItem,
  userSortItem,
  rankingPageTabs
} from '~/constants/ranking'
import {
  topicRankingPageData,
  galgameRankingPageData,
  userRankingPageData
} from '~/components/ranking/pageData'

const activeTab = computed(() => useRoute().fullPath.split('/').pop() ?? 'user')

const currentSortItems = computed(() => {
  switch (activeTab.value) {
    case 'topic':
      return topicSortItem
    case 'galgame':
      return galgameSortItem
    case 'user':
    default:
      return userSortItem
  }
})

const sortOptions = computed(() => {
  return currentSortItems.value.map((item) => ({
    value: item.sortField,
    label: item.label,
    icon: item.icon
  }))
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-3"
  >
    <div class="space-y-3">
      <h1 class="text-2xl font-bold sm:text-3xl">排行榜单</h1>

      <div class="flex items-center justify-between">
        <KunTab
          :model-value="activeTab"
          :items="rankingPageTabs"
          variant="underlined"
          color="primary"
        />

        <div class="w-48">
          <KunSelect
            v-if="activeTab === 'topic'"
            v-model="topicRankingPageData.sortField"
            :options="sortOptions"
          />
          <KunSelect
            v-if="activeTab === 'galgame'"
            v-model="galgameRankingPageData.sortField"
            :options="sortOptions"
          />
          <KunSelect
            v-if="activeTab === 'user'"
            v-model="userRankingPageData.sortField"
            :options="sortOptions"
          />
        </div>
      </div>
    </div>

    <NuxtPage />
  </KunCard>
</template>
