<script setup lang="ts">
const props = defineProps<{
  name: string
  class?: string
  className?: string
}>()
</script>

<template>
  <Icon
    :name="name"
    :class="cn('shrink-0 text-inherit', props.class, props.className)"
  />
</template>

<style lang="scss" scoped>
:deep(path) {
  color: inherit;
}

:deep(g) {
  color: inherit;
}

:deep(rect) {
  color: inherit;
}

:deep(circle) {
  color: inherit;
}
</style>
