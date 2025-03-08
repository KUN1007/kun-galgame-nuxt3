<script setup lang="ts">
import type { KunUserProps } from './type'

const props = withDefaults(defineProps<KunUserProps>(), {
  size: 'md',
  description: ''
})
</script>

<template>
  <div class="flex items-center gap-2">
    <KunAvatar :user="user" :size="size" />

    <div class="flex flex-col">
      <span>{{ user.name }}</span>
      <span v-if="description" class="text-default-500 text-sm">
        {{ description }}
      </span>
    </div>
  </div>
</template>
