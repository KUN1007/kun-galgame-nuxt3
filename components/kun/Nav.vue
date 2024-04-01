<script setup lang="ts">
const props = defineProps<{
  items: string[]
}>()

const emits = defineEmits<{
  set: [value: string]
}>()
</script>

<template>
  <div class="kun-nav">
    <span v-for="(item, index) in items" :key="index">{{ item }}</span>
  </div>
</template>

<style lang="scss" scoped>
.kun-nav {
  display: flex;
  align-items: center;

  span {
    padding: 3px 10px;
  }
}
</style>
