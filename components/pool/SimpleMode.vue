<script setup lang="ts">
const { isSimpleMode } = storeToRefs(usePersistPoolStore())
</script>

<template>
  <div class="simple-mode">
    <span>{{ $t('pool.simpleMode') }}</span>
    <KunSwitch v-model="isSimpleMode" />
  </div>
</template>

<style lang="scss" scoped>
.simple-mode {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
