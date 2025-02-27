<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <KunHeader :size="2">
    <template #header>游戏标签</template>
  </KunHeader>

  <div class="hint">如果有多个标签, 请用英语逗号分隔每个标签</div>

  <KunTextarea
    placeholder="请输入游戏标签, 例如纯爱, 萝莉, 妹妹, 白毛, 白丝, 等等"
    v-model="galgamePR[0].tags"
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
