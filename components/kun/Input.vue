<script setup lang="ts">
const value = defineModel<string | number>({ required: true })
</script>

<template>
  <input type="text" class="kun-input" v-model="value" />
</template>

<style lang="scss" scoped>
.kun-input {
  padding: 8px 12px;
  border: 1px solid var(--kungalgame-trans-blue-2);
  color: var(--kungalgame-font-color-3);
  border-radius: 10px;
  font-size: 15px;
  background-color: transparent;

  &:focus {
    border: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-blue-0);
    box-shadow: 0 0 0 0.5px var(--kungalgame-blue-5);
  }
}
</style>
