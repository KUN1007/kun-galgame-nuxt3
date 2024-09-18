<script setup lang="ts">
import type { SerializeObject } from 'nitropack'
import type { TopicReply } from '~/types/api/topic-reply'

defineProps<{
  data: {
    totalCount: number
    repliesData: SerializeObject<TopicReply>[]
  }
  pageData: {
    page: number
    limit: number
    sortOrder: string
  }
  pending: boolean
}>()

const emits = defineEmits<{
  setPage: [value: number]
  setSortOrder: [value: 'asc' | 'desc']
}>()
</script>

<template>
  <div class="tool" v-if="data && data.totalCount > 5" id="tool">
    <div class="page">
      <button
        @click="emits('setPage', -1)"
        :disabled="pageData.page === 1 || pending"
      >
        <Icon name="lucide:chevron-left" />
      </button>
      <span>
        {{
          `${pageData.page} / ${Math.ceil(data.totalCount / pageData.limit)}`
        }}
      </span>
      <button
        @click="emits('setPage', 1)"
        :disabled="
          pageData.page === Math.ceil(data.totalCount / pageData.limit) ||
            pending
        "
      >
        <Icon name="lucide:chevron-right" />
      </button>
    </div>

    <div class="order">
      <span
        :class="pageData.sortOrder === 'asc' ? 'active' : ''"
        @click="emits('setSortOrder', 'asc')"
      >
        <Icon name="lucide:arrow-up" />
      </span>
      <span
        :class="pageData.sortOrder === 'desc' ? 'active' : ''"
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

  .page {
    font-size: large;
    user-select: none;

    button {
      padding: 5px 10px;
      border-radius: 10px;
      margin: 0 7px;
      border: none;
      background-color: transparent;
      font-size: medium;
      color: var(--kungalgame-font-color-3);

      &:hover {
        background-color: var(--kungalgame-trans-blue-1);
      }

      &:disabled {
        &:hover {
          cursor: not-allowed;
          background-color: transparent;
        }
      }
    }
  }

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
