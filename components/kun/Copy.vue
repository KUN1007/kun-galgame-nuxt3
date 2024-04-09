<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <span class="kun-copy" @click="useKunCopy(text)">
    <span>{{ text }}</span>
    <Icon name="lucide:copy" />
  </span>
</template>

<style lang="scss" scoped>
.kun-copy {
  cursor: pointer;
  border: 1px solid var(--kungalgame-blue-5);
  color: var(--kungalgame-blue-5);
  padding: 3px 10px;
  font-weight: bold;
  border-radius: 10px;

  &:hover {
    background-color: var(--kungalgame-trans-blue-0);
  }

  .icon {
    margin-left: 10px;
  }
}
</style>
