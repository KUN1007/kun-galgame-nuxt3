<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

defineProps<{
  replyData: TopicReply[]
  pending: boolean
  sortOrder: 'asc' | 'desc'
}>()

const emits = defineEmits<{
  setSortOrder: [value: 'asc' | 'desc']
}>()
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    v-if="replyData && replyData.length > 5"
  >
    <div class="flex items-center gap-2">
      <KunButton
        :is-icon-only="true"
        :variant="sortOrder === 'desc' ? 'flat' : 'light'"
        size="lg"
        @click="emits('setSortOrder', 'desc')"
      >
        <Icon class="text-inherit" name="lucide:arrow-down" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        :variant="sortOrder === 'asc' ? 'flat' : 'light'"
        size="lg"
        @click="emits('setSortOrder', 'asc')"
      >
        <Icon class="text-inherit" name="lucide:arrow-up" />
      </KunButton>

      <span class="pending" v-if="pending">少女祈祷中...</span>
    </div>
  </KunCard>
</template>
