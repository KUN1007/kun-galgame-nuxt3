<script setup lang="ts">
const props = defineProps<{
  type: 'create' | 'rewrite'
}>()

const { galgamePR } = storeToRefs(useTempGalgamePRStore())
const { series } = storeToRefs(usePersistEditGalgameStore())

const handleUpdateGalgameSeries = (value: string | number) => {
  const seriesArray = value
    .toString()
    .split(',')
    .map((l) => l.trim())
  if (props.type === 'create') {
    series.value = seriesArray
  } else {
    galgamePR.value[0].series = seriesArray
  }
}

const getValue = computed(() => {
  return props.type === 'create'
    ? series.value.toString()
    : galgamePR.value[0].series.toString()
})
</script>

<template>
  <div class="space-y-2">
    <div class="space-y-2">
      <h2 class="text-xl">游戏系列</h2>
      <p class="text-default-500">如果有多个游戏, 请用英语逗号分隔每个序号</p>
    </div>

    <KunTextarea
      placeholder="请输入游戏序号 (网站内序号, 可以在单个游戏页面的信息部分查看序号), 例如 `巧克甜恋 1, 巧克甜恋 2, 巧克甜恋 3` 就是一个系列, 那么填写 `18, 19, 20` 即可"
      :model-value="getValue"
      @update:model-value="handleUpdateGalgameSeries"
    />
  </div>
</template>
