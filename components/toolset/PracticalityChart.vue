<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import type { ToolsetRating } from '~/types/api/toolset'

const props = defineProps<{
  id: number
  practicalityData: ToolsetRating
}>()

const colorMode = useColorMode()

const categories = computed(() =>
  Array.from({ length: 5 }, (_, i) => String(i + 1))
)

const countsArray = computed(() =>
  categories.value.map((c) => props.practicalityData.counts[Number(c)] ?? 0)
)

const total = computed(() => countsArray.value.reduce((s, v) => s + v, 0))

const cumulative = computed(() => {
  const out: number[] = []
  let sum = 0
  for (const v of countsArray.value) {
    sum += v
    out.push(sum)
  }
  return out
})

const mineIndex = computed(() =>
  props.practicalityData.mine == null
    ? -1
    : categories.value.indexOf(String(props.practicalityData.mine))
)

const series = computed(
  (): ApexAxisChartSeries => [
    { name: '评分人数', type: 'bar', data: countsArray.value },
    { name: '累计人数', type: 'line', data: cumulative.value }
  ]
)

const colors = computed(() => [
  'var(--color-primary)',
  'var(--color-secondary)'
])

const options = computed(
  (): ApexOptions => ({
    chart: {
      id: `practicality-chart-${props.id}`,
      type: 'bar',
      height: 260,
      toolbar: { show: false },
      fontFamily: 'inherit'
    },
    plotOptions: {
      bar: {
        columnWidth: '55%',
        distributed: false,
        dataLabels: { position: 'top' }
      }
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
      formatter: (val) => String(val ?? ''),
      offsetY: -24,
      style: { fontSize: '12px', colors: ['var(--color-default-900)'] }
    },
    stroke: {
      width: [0, 3],
      curve: 'smooth'
    },
    markers: { size: 4, colors: 'var(--color-secondary-200)' },
    xaxis: {
      categories: categories.value,
      labels: { style: { colors: 'var(--color-default-500)' } }
    },
    yaxis: [
      {
        title: { text: '人数' },
        labels: { style: { colors: 'var(--color-default-900)' } }
      }
    ],
    colors: colors.value,
    tooltip: {
      theme: colorMode.value,
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number, { seriesIndex }) => {
          if (seriesIndex === 1) {
            const pct = total.value
              ? ((y / total.value) * 100).toFixed(1)
              : '0.0'
            return `${y} 人 (${pct}%)`
          }
          return `${y} 人`
        }
      }
    },
    grid: { borderColor: 'var(--color-default-200)', strokeDashArray: 4 },
    legend: {
      show: true,
      position: 'top',
      labels: { colors: 'var(--color-default-900)' }
    },
    annotations: {
      points:
        mineIndex.value >= 0
          ? [
              {
                x: categories.value[mineIndex.value],
                y: countsArray.value[mineIndex.value] ?? 0,
                marker: {
                  size: 6,
                  fillColor: 'var(--color-primary-200)',
                  strokeColor: '#FFF'
                }
              }
            ]
          : []
    }
  })
)
</script>

<template>
  <div class="contents">
    <ClientOnly>
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <h3 class="font-semibold">工具实用性分布</h3>
          <span class="text-default-500">
            平均
            <span class="text-warning text-lg font-bold">
              {{ practicalityData.avg.toFixed(1) }}
            </span>
            / 5.0
          </span>
        </div>

        <VueApexCharts
          :key="practicalityData.mine"
          type="bar"
          height="260"
          :options="options"
          :series="series"
        />
      </div>
    </ClientOnly>
  </div>
</template>
