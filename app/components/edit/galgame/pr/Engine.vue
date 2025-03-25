<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <div class="space-y-2">
    <div class="space-y-2">
      <h2 class="text-xl">游戏引擎</h2>
      <p class="text-default-500">如果有多个引擎, 请用英语逗号分隔每个引擎</p>
    </div>
    <KunTextarea
      placeholder="请输入游戏的引擎名，例如 KiriKiri, RUGP, Shiina Rio, 可以输入多个"
      :model-value="galgamePR[0].engine.toString()"
      @update:model-value="
        (value) =>
          (galgamePR[0].engine = value
            .toString()
            .split(',')
            .map((l) => l.trim()))
      "
    />
  </div>
</template>
