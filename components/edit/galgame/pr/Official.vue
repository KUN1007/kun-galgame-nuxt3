<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <KunHeader :size="2">
    <template #header>官网</template>
  </KunHeader>

  <div class="hint">如果有多个官网，请用英语逗号分隔每个链接</div>

  <KunTextarea placeholder="请输入官网链接" v-model="galgamePR[0].official" />
</template>

<style lang="scss" scoped>
.kun-textarea {
  width: 100%;
  margin-bottom: 17px;
}

.hint {
  color: var(--kungalgame-font-color-0);
  margin-bottom: 17px;
  font-size: small;
}
</style>
