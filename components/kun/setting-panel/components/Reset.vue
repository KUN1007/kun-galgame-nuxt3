<script setup lang="ts">
const handleRecover = async () => {
  await usePersistSettingsStore().setKUNGalgameSettingsRecover()
}
</script>

<template>
  <button class="reset" @click="handleRecover">
    {{ $t('header.settings.recover') }}
  </button>
</template>

<style lang="scss" scoped>
.reset {
  font-size: 15px;
  cursor: pointer;
  margin-top: 20px;
  color: var(--kungalgame-red-5);
  border: 1px solid var(--kungalgame-red-5);
  background-color: var(--kungalgame-trans-white-9);
  width: 100%;
  height: 30px;

  &:hover {
    background-color: var(--kungalgame-red-5);
    color: var(--kungalgame-white);
  }
}
</style>
