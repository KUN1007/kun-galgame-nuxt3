<script setup lang="ts">
import {
  topicSortItem,
  userSortItem,
  KUN_RANKING_TOPIC_MAP,
  KUN_RANKING_USER_MAP,
  rankingPageTabs
} from '~/constants/ranking'
import {
  topicRankingPageData,
  userRankingPageData
} from '~/components/ranking/pageData'

const route = useRoute()

const currentRouteName = computed(
  () => route.fullPath.split('/').pop() ?? 'user'
)
const activeTab = ref(currentRouteName)

const sortOptions = computed(() => {
  const items = activeTab.value === 'topic' ? topicSortItem : userSortItem
  return items.map((item) => ({
    value: item.name,
    label:
      activeTab.value === 'topic'
        ? KUN_RANKING_TOPIC_MAP[item.sortField]
        : KUN_RANKING_USER_MAP[item.sortField],
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
          v-model="activeTab"
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
            v-else
            v-model="userRankingPageData.sortField"
            :options="sortOptions"
          />
        </div>
      </div>
    </div>

    <NuxtPage />
  </KunCard>
</template>
