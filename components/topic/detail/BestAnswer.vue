<script setup lang="ts">
import { scrollPage } from '../_helper'
import type { TopicBestAnswer } from '~/types/api/topic'

defineProps<{
  bestAnswer: TopicBestAnswer
}>()
</script>

<template>
  <div
    :class="
      cn(
        'bg-success-500/20 text-success-700 dark:text-success-300 cursor-pointer',
        'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold'
      )
    "
    @click="scrollPage(bestAnswer.floor)"
  >
    <KunUser :disable-floating="true" :user="bestAnswer.user" />
    {{ `在 #${bestAnswer.floor} 发布了最佳答案` }}
  </div>
</template>
