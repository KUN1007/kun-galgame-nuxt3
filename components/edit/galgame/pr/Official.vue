<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <KunHeader :size="2">
    <template #header>官网链接</template>
  </KunHeader>
  <KunInput v-model="galgamePR[0].official" placeholder="请输入官网的地址" />
</template>

<style lang="scss" scoped>
.kun-input {
  width: 100%;
  margin-bottom: 17px;
}
</style>
