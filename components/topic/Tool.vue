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
  <div class="tool" v-if="replyData && replyData.length > 5">
    <div class="order">
      <span
        :class="sortOrder === 'asc' ? 'active' : ''"
        @click="emits('setSortOrder', 'asc')"
      >
        <Icon name="lucide:arrow-up" />
      </span>
      <span
        :class="sortOrder === 'desc' ? 'active' : ''"
        @click="emits('setSortOrder', 'desc')"
      >
        <Icon name="lucide:arrow-down" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tool {
  padding: 10px;
  margin-bottom: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include kun-blur;

  .order {
    display: flex;
    white-space: nowrap;

    span {
      cursor: pointer;
      padding: 3px 10px;
      margin-right: 5px;
      border-radius: 10px;
    }

    .icon {
      font-size: 20px;
    }

    .active {
      box-shadow: var(--shadow);
      color: var(--kungalgame-blue-5);
    }
  }
}

@media (max-width: 700px) {
  .tool {
    margin-bottom: 7px;
  }
}
</style>
