<script setup lang="ts">
defineProps<{
  replyCount: number
  status: 'idle' | 'pending' | 'success' | 'error'
  sortOrder: 'asc' | 'desc'
}>()

const emits = defineEmits<{
  setSortOrder: [value: 'asc' | 'desc']
}>()
</script>

<template>
  <KunCard
    v-if="replyCount > 0"
    :is-transparent="false"
    :is-hoverable="false"
    class-name="sticky top-16 z-10 backdrop-blur-md bg-background/70"
  >
    <div class="flex items-center justify-between">
      <p class="text-default-700 text-sm font-bold">{{ replyCount }} 条回复</p>

      <div class="flex items-center gap-1">
        <KunButton
          size="sm"
          :variant="sortOrder === 'asc' ? 'flat' : 'light'"
          :is-disabled="status === 'pending'"
          @click="emits('setSortOrder', 'asc')"
        >
          <template #startContent>
            <KunIcon name="lucide:arrow-up" />
          </template>
          最早
        </KunButton>
        <KunButton
          size="sm"
          :variant="sortOrder === 'desc' ? 'flat' : 'light'"
          :is-disabled="status === 'pending'"
          @click="emits('setSortOrder', 'desc')"
        >
          <template #startContent>
            <KunIcon name="lucide:arrow-down" />
          </template>
          最新
        </KunButton>
      </div>
    </div>
  </KunCard>
</template>
