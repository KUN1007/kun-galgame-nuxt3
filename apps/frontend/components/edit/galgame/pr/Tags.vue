<script setup lang="ts">
const props = defineProps<{
  type: 'create' | 'rewrite'
}>()

const { galgamePR } = storeToRefs(useTempGalgamePRStore())
const { tags } = storeToRefs(usePersistEditGalgameStore())

const handleUpdateGalgameTag = (value: string | number) => {
  const tagArray = value
    .toString()
    .split(',')
    .map((l) => l.trim())
  if (props.type === 'create') {
    tags.value = tagArray
  } else {
    galgamePR.value[0].tags = tagArray
  }
}

const getValue = computed(() => {
  return props.type === 'create'
    ? tags.value.toString()
    : galgamePR.value[0].tags.toString()
})
</script>

<template>
  <div class="space-y-2">
    <div class="space-y-2">
      <h2 class="text-xl">游戏标签</h2>
      <p class="text-default-500">如果有多个标签, 请用英语逗号分隔每个标签</p>
    </div>

    <KunTextarea
      placeholder="请输入游戏标签, 例如纯爱, 萝莉, 妹妹, 白毛, 白丝, 等等"
      :model-value="getValue"
      @update:model-value="handleUpdateGalgameTag"
    />
  </div>
</template>
