<script setup lang="ts">
import type { KunUserProps } from './type'

const props = withDefaults(defineProps<KunUserProps>(), {
  size: 'md',
  description: '',
  className: '',
  disableFloating: false,
  floatingPosition: 'top'
})
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.className)">
    <KunAvatar
      :floating-position="props.floatingPosition"
      :disable-floating="props.disableFloating"
      :user="user"
      :size="size"
    />

    <div class="flex flex-col text-sm">
      <span>{{ user.name }}</span>
      <span v-if="description" class="text-default-500">
        {{ description }}
      </span>
    </div>
  </div>
</template>
