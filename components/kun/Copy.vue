<script setup lang="ts">
withDefaults(defineProps<{ text: string; name?: string }>(), {
  name: ''
})
</script>

<template>
  <span class="kun-copy" @click="useKunCopy(text)">
    <span>{{ name ? name : text }}</span>
    <Icon class="icon" name="lucide:copy" />
  </span>
</template>

<style lang="scss" scoped>
.kun-copy {
  cursor: pointer;
  color: var(--kungalgame-blue-5);
  padding: 3px 10px;
  font-weight: bold;
  border-radius: 10px;
  word-break: break-all;

  &:hover {
    background-color: var(--kungalgame-trans-blue-0);
  }

  .icon {
    margin-left: 10px;
  }
}
</style>
