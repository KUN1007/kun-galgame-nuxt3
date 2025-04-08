<script setup lang="ts">
const props = defineProps<{
  type: 'create' | 'rewrite'
}>()

const { galgamePR } = storeToRefs(useTempGalgamePRStore())
const { official } = storeToRefs(usePersistEditGalgameStore())

const handleUpdateGalgameOfficial = (value: string | number) => {
  const officialArray = value
    .toString()
    .split(',')
    .map((l) => l.trim())
  if (props.type === 'create') {
    official.value = officialArray
  } else {
    galgamePR.value[0].official = officialArray
  }
}

const getValue = computed(() => {
  return props.type === 'create'
    ? official.value.toString()
    : galgamePR.value[0].official.toString()
})
</script>

<template>
  <div class="space-y-2">
    <div class="space-y-2">
      <h2 class="text-xl">游戏官网</h2>
      <p class="text-default-500">如果有多个官网，请用英语逗号分隔每个链接</p>
    </div>

    <KunTextarea
      placeholder="请输入游戏的官网, 例如 http://sweet.clearrave.co.jp/karehana/"
      :model-value="getValue"
      @update:model-value="handleUpdateGalgameOfficial"
    />
  </div>
</template>
