<script setup lang="ts">
const props = defineProps<{
  margin?: string
}>()

const margin = computed(() => props.margin ?? '33px 0')
</script>

<template>
  <div class="kun-divider">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.kun-divider {
  color: var(--kungalgame-font-color-0);
  font-weight: normal;
  font-size: small;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-align: center;
  margin: v-bind(margin);

  &::before {
    color: var(--kungalgame-trans-blue-2);
    content: '';
    position: relative;
    width: 50%;
    border-block-start: 1px solid transparent;
    border-block-start-color: inherit;
    border-block-end: 0;
    transform: translateY(50%);
  }

  &::after {
    color: var(--kungalgame-trans-blue-2);
    content: '';
    position: relative;
    width: 50%;
    border-block-start: 1px solid transparent;
    border-block-start-color: inherit;
    border-block-end: 0;
    transform: translateY(50%);
  }
}
</style>
