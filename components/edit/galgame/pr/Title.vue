<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
const title = computed(() => galgamePR.value[0].name)
</script>

<template>
  <div class="space-y-2">
    <div class="space-y-2">
      <h2 class="text-xl">游戏标题</h2>
      <p class="text-default-500">
        标题要求至少写一种, 非常建议全部填写 (如果游戏没有对应翻译可以不填写,
        英语标题可以从 VNDB 自动获取到)
      </p>
    </div>

    <div class="space-y-2">
      <KunInput placeholder="英语" v-model="title['en-us']" />
      <KunInput placeholder="日语" v-model="title['ja-jp']" />
      <KunInput placeholder="简体中文" v-model="title['zh-cn']" />
      <KunInput placeholder="繁体中文" v-model="title['zh-tw']" />
    </div>
  </div>
</template>
