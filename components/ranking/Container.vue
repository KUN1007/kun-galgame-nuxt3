<script setup lang="ts">
import {
  topicSortItem,
  userSortItem,
  topicIconMap,
  userIconMap,
  KUN_RANKING_TOPIC_MAP,
  KUN_RANKING_USER_MAP
} from '~/constants/ranking'
import type {
  RankingTopicSortField,
  RankingUserSortField,
  RankingTopic,
  RankingUser
} from '~/constants/ranking'

const tabs = [
  {
    textValue: 'Topics',
    value: 'topics',
    icon: 'heroicons:document-text'
  },
  {
    textValue: 'Users',
    value: 'users',
    icon: 'heroicons:users'
  }
]

const activeTab = ref('topics')
const currentSort = ref<RankingTopicSortField | RankingUserSortField>('views')

const sortOptions = computed(() => {
  const items = activeTab.value === 'topics' ? topicSortItem : userSortItem
  return items.map((item) => ({
    value: item.name,
    label:
      activeTab.value === 'topics'
        ? KUN_RANKING_TOPIC_MAP[item.sortField]
        : KUN_RANKING_USER_MAP[item.sortField],
    icon: item.icon
  }))
})

const currentIcon = computed(() => {
  const iconMap = activeTab.value === 'topics' ? topicIconMap : userIconMap
  return iconMap[currentSort.value]
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="mb-4 text-3xl font-bold text-gray-900">Rankings</h1>

      <div class="flex items-center justify-between">
        <KunTab
          v-model="activeTab"
          :items="tabs"
          variant="underlined"
          color="primary"
        />

        <KunSelect
          v-model="currentSort"
          :options="sortOptions"
          placeholder="Select sorting"
          class="w-48"
        />
      </div>
    </div>

    <div class="rounded-lg bg-white shadow">
      <div v-if="activeTab === 'topics'" class="divide-y divide-gray-200">
        <div
          v-for="(topic, index) in []"
          :key="topic.tid"
          class="flex items-center p-4 hover:bg-gray-50"
        >
          <span class="w-12 text-xl font-bold text-gray-400">{{
            index + 1
          }}</span>
          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-900">
              {{ topic.title }}
            </h3>
          </div>
          <div class="flex items-center space-x-2">
            <Icon :name="currentIcon" class="h-5 w-5 text-gray-500" />
            <span class="font-medium">{{ topic.field }}</span>
          </div>
        </div>
      </div>

      <div v-else class="divide-y divide-gray-200">
        <div
          v-for="(user, index) in []"
          :key="user.uid"
          class="flex items-center p-4 hover:bg-gray-50"
        >
          <span class="w-12 text-xl font-bold text-gray-400">{{
            index + 1
          }}</span>
          <div class="flex flex-1 items-center">
            <img
              :src="user.avatar"
              class="mr-4 h-10 w-10 rounded-full"
              :alt="user.name"
            />
            <h3 class="text-lg font-medium text-gray-900">{{ user.name }}</h3>
          </div>
          <div class="flex items-center space-x-2">
            <Icon :name="currentIcon" class="h-5 w-5 text-gray-500" />
            <span class="font-medium">{{ user.field }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
