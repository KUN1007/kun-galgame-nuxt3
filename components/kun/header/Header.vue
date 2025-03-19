<script setup lang="ts">
withDefaults(
  defineProps<{
    name?: string
    description?: string
    isShowDivider?: boolean
  }>(),
  {
    name: '',
    description: '',
    isShowDivider: true
  }
)
</script>

<template>
  <div className="space-y-2">
    <div className="flex justify-between">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">
          <span v-if="name">{{ name }}</span>
          <slot name="title" />
        </h1>

        <p v-if="description" className="whitespace-pre-wrap text-default-500">
          {{ description }}
        </p>
      </div>
      <slot name="headerEndContent" />
    </div>
    <slot name="endContent" />
  </div>
  <KunDivider v-if="isShowDivider" />
</template>
