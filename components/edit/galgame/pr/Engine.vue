<script setup lang="ts">
const props = defineProps<{
  type: 'create' | 'rewrite'
}>()

const { galgamePR } = storeToRefs(useTempGalgamePRStore())
const { engine } = storeToRefs(usePersistEditGalgameStore())

const handleUpdateGalgameEngine = (value: string | number) => {
  const engineArray = value
    .toString()
    .split(',')
    .map((l) => l.trim())
  if (props.type === 'create') {
    engine.value = engineArray
  } else {
    galgamePR.value[0].engine = engineArray
  }
}

const getValue = computed(() => {
  return props.type === 'create'
    ? engine.value.toString()
    : galgamePR.value[0].engine.toString()
})
</script>

<template>
  <div class="space-y-2">
    <div class="space-y-2">
      <h2 class="text-xl">游戏引擎</h2>
      <p class="text-default-500">如果有多个引擎, 请用英语逗号分隔每个引擎</p>
    </div>
    <KunTextarea
      placeholder="请输入游戏的引擎名，例如 KiriKiri, RUGP, Shiina Rio, 可以输入多个"
      :model-value="getValue"
      @update:model-value="handleUpdateGalgameEngine"
    />
  </div>
</template>
