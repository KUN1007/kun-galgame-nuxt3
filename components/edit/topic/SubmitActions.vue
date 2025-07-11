<script setup lang="ts">
import { useTopicSubmitter } from '~/composables/topic/useTopicSubmitter'

const { submit, isSubmitting, isRewriteMode } = useTopicSubmitter()

const buttonText = computed(() => {
  if (isSubmitting.value) return '处理中...'
  return isRewriteMode.value ? '确认更改' : '发布话题'
})
</script>

<template>
  <div class="flex items-center justify-end gap-4">
    <kbd
      class="border-default-200 bg-default-100 text-default-800 rounded-lg border px-2 py-1.5 text-xs font-semibold"
    >
      Ctrl
    </kbd>
    +
    <kbd
      class="border-default-200 bg-default-100 text-default-800 rounded-lg border px-2 py-1.5 text-xs font-semibold"
    >
      Enter
    </kbd>

    <KunButton
      @click="submit"
      size="lg"
      :disabled="isSubmitting"
      class="min-w-[120px]"
    >
      <Icon
        v-if="isSubmitting"
        name="lucide:loader-2"
        class="h-5 w-5 animate-spin"
      />
      <span v-else>{{ buttonText }}</span>
    </KunButton>
  </div>
</template>
