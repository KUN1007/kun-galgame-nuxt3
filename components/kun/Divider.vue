<script setup lang="ts">
withDefaults(
  defineProps<{
    margin?: string
    color?: string
    textColor?: string
  }>(),
  {
    margin: 'my-8',
    color: 'gray-300',
    textColor: 'gray-600'
  }
)
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center text-center text-sm font-normal whitespace-nowrap',
        margin
      )
    "
  >
    <div :class="['bg- h-px flex-grow' + color]"></div>
    <div v-if="$slots.default" :class="['px-3', 'text-' + textColor]">
      <slot />
    </div>
    <div :class="['bg- h-px flex-grow' + color]"></div>
  </div>
</template>
