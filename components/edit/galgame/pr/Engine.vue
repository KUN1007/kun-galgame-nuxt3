<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <KunHeader :size="2">
    <template #header>游戏引擎</template>
  </KunHeader>

  <div class="hint">如果有多个引擎, 请用英语逗号分隔每个引擎</div>

  <KunTextarea
    placeholder="请输入游戏的引擎名，例如 KiriKiri, RUGP, Shiina Rio, 可以输入多个"
    v-model="galgamePR[0].engine"
  />
</template>

<style lang="scss" scoped>
.kun-input {
  width: 100%;
  margin-bottom: 17px;
}

.hint {
  color: var(--kungalgame-font-color-0);
  margin-bottom: 17px;
  font-size: small;
}
</style>
