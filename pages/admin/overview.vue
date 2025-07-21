<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import {
  type StatsModelType,
  KUN_ADMIN_OVERVIEW_STATS_MODEL_MAP
} from '~/constants/admin'

interface StatDay {
  date: string
  [key: string]: number | string
}

const selectedDays = ref(7)

const debouncedDays = ref(selectedDays.value)

watchDebounced(
  selectedDays,
  (newValue) => {
    debouncedDays.value = newValue
  },
  { debounce: 300, maxWait: 1000 }
)

const { data } = await useFetch<StatDay[]>('/api/admin/overview/stats', {
  method: 'GET',

  query: { days: debouncedDays },

  ...kungalgameResponseHandler
})

const totalStats = computed(() => {
  if (!data.value) return []

  const totals: Record<StatsModelType, number> = {
    chat_message: 0,
    galgame_comment: 0,
    galgame_resource: 0,
    galgame_website: 0,
    galgame_website_comment: 0,
    galgame: 0,
    topic_comment: 0,
    topic_reply: 0,
    topic: 0,
    user: 0
  }

  for (const day of data.value) {
    for (const modelKey in totals) {
      const count = day[modelKey]
      if (typeof count === 'number') {
        totals[modelKey as StatsModelType] += count
      }
    }
  }

  return (
    Object.keys(KUN_ADMIN_OVERVIEW_STATS_MODEL_MAP) as StatsModelType[]
  ).map((name) => ({
    name,
    label: KUN_ADMIN_OVERVIEW_STATS_MODEL_MAP[name].label,
    total: totals[name]
  }))
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    content-class="space-y-6"
  >
    <KunHeader
      name="数据总览"
      description="查看过去一段时间内核心数据的增长趋势。"
    />

    <KunSlider :min="1" :max="30" :step="1" v-model="selectedDays" />

    <div v-if="data">
      <div
        class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        <KunCard
          :is-transparent="true"
          :is-hoverable="false"
          :is-pressable="false"
          v-for="stat in totalStats"
          :key="stat.name"
        >
          <p
            class="truncate text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {{ stat.label }}
          </p>
          <p class="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">
            {{ stat.total.toLocaleString() }}
          </p>
          <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">
            最近 {{ selectedDays }} 天新增
          </p>
        </KunCard>
      </div>

      <KunCard
        :is-transparent="true"
        :is-hoverable="false"
        :is-pressable="false"
      >
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          新增趋势图
        </h3>
        <AdminOverviewChart :data="data" />
      </KunCard>
    </div>
  </KunCard>
</template>
