<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <KunHeader :size="2">
    <template #header>
      {{ $t('edit.pr.official.name') }}
    </template>
  </KunHeader>
  <KunInput
    v-model="galgamePR[0].official"
    :placeholder="`${$t('edit.pr.official.placeholder')}`"
  />
</template>

<style lang="scss" scoped>
.kun-input {
  width: 100%;
  margin-bottom: 17px;
}
</style>
