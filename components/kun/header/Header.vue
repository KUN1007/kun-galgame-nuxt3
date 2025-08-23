<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string
    description?: string
    isShowDivider?: boolean
    scale?: 'h1' | 'h2' | 'h3'
  }>(),
  {
    name: '',
    description: '',
    isShowDivider: true,
    scale: 'h1'
  }
)
const headingClass = computed(() => {
  const scaleClasses = {
    h1: 'text-2xl sm:text-3xl',
    h2: 'text-xl sm:text-2xl',
    h3: 'text-lg sm:text-xl'
  }
  return cn('font-medium', scaleClasses[props.scale])
})
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <div class="space-y-2">
        <component :is="scale" :class="headingClass">
          <span v-if="name">{{ name }}</span>
          <slot name="title" />
        </component>

        <p
          v-if="description"
          class="text-default-500 text-sm whitespace-pre-wrap sm:text-base"
        >
          {{ description }}
        </p>
      </div>
      <slot name="headerEndContent" />
    </div>
    <slot name="endContent" />
  </div>
  <KunDivider v-if="isShowDivider" />
</template>
