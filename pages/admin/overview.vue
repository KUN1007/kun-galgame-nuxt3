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

const { data: allStats } = await useFetch('/api/admin/overview/all', {
  method: 'GET',
  ...kungalgameResponseHandler
})

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

useKunSeoMeta({
  title: '数据总览',
  description:
    '查看过去一段时间内用户, 话题, Galgame, Galgame 资源, Galgame 网站, Galgame 评论, Galgame 网站评论的增长趋势'
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    content-class="space-y-12"
  >
    <KunHeader
      name="数据总览"
      description="查看过去一段时间内用户, 话题, Galgame, Galgame 资源, Galgame 网站, Galgame 评论, Galgame 网站评论的增长趋势。好的网站理应的开放的, 您有权利知道这个网站的一切, 当天的数据将会延时更新若干小时。"
    />

    <div class="space-y-3">
      <h2 class="text-2xl">加和数据</h2>
      <p class="text-default-500 text-sm">网站在建立以来, 各项指标的总和数据</p>
      <div
        v-if="allStats"
        class="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5"
      >
        <KunCard
          :is-transparent="true"
          :is-hoverable="false"
          :is-pressable="false"
          v-for="stat in allStats"
          :key="stat.name"
          :dark-border="true"
        >
          <p
            class="truncate text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {{ stat.label }}
          </p>
          <p class="text-2xl font-extrabold text-gray-900 dark:text-white">
            {{ stat.count.toLocaleString() }}
          </p>
        </KunCard>
      </div>
    </div>

    <div class="space-y-3">
      <h2 class="text-2xl">增量数据</h2>
      <p class="text-default-500 text-sm">
        网站在指定时间段内, 各项指标的增量数据
      </p>
      <KunSlider :min="1" :max="30" :step="1" v-model="selectedDays" />
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        <KunCard
          :is-transparent="true"
          :is-hoverable="false"
          :is-pressable="false"
          v-for="stat in totalStats"
          :key="stat.name"
          :dark-border="true"
        >
          <p
            class="truncate text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {{ stat.label }}
          </p>
          <p
            class="flex items-center gap-3 text-2xl font-extrabold text-gray-900 dark:text-white"
          >
            <KunIcon
              v-if="stat.total > 0"
              name="lucide:trending-up"
              class-name="text-success-600"
            />
            <span>{{ stat.total.toLocaleString() }}</span>
          </p>
          <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">
            最近 {{ selectedDays }} 天新增
          </p>
        </KunCard>
      </div>
    </div>

    <div class="space-y-3">
      <h2 class="text-2xl">增量趋势图</h2>
      <p class="text-default-500 text-sm">
        如果要用一张可视化的图表来表示网站的增量数据状态, 那就是下面这张图
      </p>
      <KunCard
        :is-transparent="true"
        :is-hoverable="false"
        :is-pressable="false"
        :dark-border="true"
      >
        <AdminOverviewChart v-if="data" :data="data" />
      </KunCard>
    </div>
  </KunCard>
</template>
