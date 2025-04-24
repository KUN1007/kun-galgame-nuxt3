<script setup lang="ts">
const props = defineProps<{
  type: 'create' | 'rewrite'
}>()

const { contentLimit } = storeToRefs(usePersistEditGalgameStore())
const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const isNsfw =
  props.type === 'create'
    ? contentLimit.value === 'nsfw'
    : galgamePR.value[0].contentLimit === 'nsfw'
const option = ref(isNsfw)

watch(
  () => option.value,
  () => {
    const optionString = option.value ? 'nsfw' : 'sfw'
    if (props.type === 'create') {
      contentLimit.value = optionString
    } else {
      galgamePR.value[0].contentLimit = optionString
    }
  }
)
</script>

<template>
  <div class="space-y-2">
    <h2 class="space-x-2 text-xl">
      <span>内容限制</span>
      <span class="font-base text-danger text-sm">新增</span>
    </h2>
    <p class="text-default-500 text-sm">
      如果您觉得您的游戏介绍以及封面不适合在公共场所打开 (例如:
      用淫乱喷雾强制贞淑人妻们发情), 请将本项设置为 NSFW (Not safe for work),
      若没有任何不适宜打开的内容 (例如: 永不枯萎的世界与终结之花), 则默认为 SFW
      (Safe for work)。这将防止社死并有助于网站索引。
    </p>

    <KunSwitch v-model="option" label="开启 NSFW" />
  </div>
</template>
