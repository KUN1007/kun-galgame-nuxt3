<script setup lang="ts">
withDefaults(
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
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <div class="space-y-2">
        <component
          :is="scale"
          :class="
            cn(
              'font-medium',
              scale === 'h1'
                ? 'text-3xl'
                : scale === 'h2'
                  ? 'text-2xl'
                  : 'text-xl'
            )
          "
        >
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
