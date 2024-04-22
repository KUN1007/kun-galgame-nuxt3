<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <KunHeader :size="2">
    <template #header>
      {{ $t('edit.pr.engine.name') }}
    </template>
  </KunHeader>

  <KunTextarea
    :placeholder="`${$t('edit.pr.engine.placeholder')}`"
    v-model="galgamePR[0].engine"
  />
</template>

<style lang="scss" scoped>
.kun-input {
  width: 100%;
  margin-bottom: 17px;
}
</style>
