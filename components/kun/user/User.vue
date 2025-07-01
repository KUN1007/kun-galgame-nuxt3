<script setup lang="ts">
import type { KunUserProps } from './type'

withDefaults(defineProps<KunUserProps>(), {
  size: 'md',
  description: ''
})
</script>

<template>
  <div class="flex items-center gap-2">
    <KunAvatar :user="user" :size="size" />

    <div class="flex flex-col text-sm">
      <span>{{ user.name }}</span>
      <span v-if="description" class="text-default-500">
        {{ description }}
      </span>
    </div>
  </div>
</template>
