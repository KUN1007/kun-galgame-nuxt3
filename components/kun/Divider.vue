<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    margin?: string
    color?: string
  }>(),
  {
    margin: '32px 0',
    color: 'var(--kungalgame-trans-blue-2)'
  }
)

const { margin, color } = toRefs(props)
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
    color: v-bind(color);
    content: '';
    position: relative;
    width: 50%;
    border-block-start: 1px solid transparent;
    border-block-start-color: inherit;
    border-block-end: 0;
    transform: translateY(50%);
  }

  &::after {
    color: v-bind(color);
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
