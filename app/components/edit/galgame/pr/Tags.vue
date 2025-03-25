<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <div class="space-y-2">
    <div class="space-y-2">
      <h2 class="text-xl">游戏标签</h2>
      <p class="text-default-500">如果有多个标签, 请用英语逗号分隔每个标签</p>
    </div>

    <KunTextarea
      placeholder="请输入游戏标签, 例如纯爱, 萝莉, 妹妹, 白毛, 白丝, 等等"
      :model-value="galgamePR[0].tags.toString()"
      @update:model-value="
        (value) =>
          (galgamePR[0].tags = value
            .toString()
            .split(',')
            .map((l) => l.trim()))
      "
    />
  </div>
</template>
