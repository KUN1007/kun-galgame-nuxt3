<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <div class="space-y-2">
    <div class="space-y-2">
      <h2 class="text-xl">游戏官网</h2>
      <p class="text-default-500">如果有多个官网，请用英语逗号分隔每个链接</p>
    </div>

    <KunTextarea
      placeholder="请输入游戏的引擎名，例如 KiriKiri, RUGP, Shiina Rio, 可以输入多个"
      :model-value="galgamePR[0].official.toString()"
      @update:model-value="
        (value) =>
          (galgamePR[0].official = value
            .toString()
            .split(',')
            .map((l) => l.trim()))
      "
    />
  </div>
</template>
