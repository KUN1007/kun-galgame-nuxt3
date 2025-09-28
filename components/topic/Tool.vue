<script setup lang="ts">
import {
  topicSortFieldOptions,
  topicSortCategoryOptions,
  KUN_TOPIC_PAGE_SORT_FIELD,
  KUN_TOPIC_CATEGORY
} from '~/constants/topic'
import { pageData } from './pageData'

const { layout } = storeToRefs(usePersistKUNGalgameTopicStore())
</script>

<template>
  <div
    class="bg-background flex flex-wrap justify-between gap-2 rounded-lg border p-3"
  >
    <div class="flex w-96 gap-2">
      <KunSelect
        :model-value="pageData.sortField"
        :options="topicSortFieldOptions"
        @set="
          (value) => (pageData.sortField = value as typeof pageData.sortField)
        "
      >
        <span>{{ KUN_TOPIC_PAGE_SORT_FIELD[pageData.sortField] }}</span>
      </KunSelect>

      <KunSelect
        :options="topicSortCategoryOptions"
        :model-value="pageData.category"
        @set="
          (value) => (pageData.category = value as typeof pageData.category)
        "
      >
        <span>{{ KUN_TOPIC_CATEGORY[pageData.category] }}</span>
      </KunSelect>
    </div>

    <div class="flex items-center gap-2">
      <KunButton
        :is-icon-only="true"
        :variant="layout === 'grid' ? 'flat' : 'light'"
        size="lg"
        @click="layout = 'grid'"
      >
        <KunIcon class="text-inherit" name="lucide:layout-grid" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        :variant="layout === 'list' ? 'flat' : 'light'"
        size="lg"
        @click="layout = 'list'"
      >
        <KunIcon class="text-inherit" name="lucide:list" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        :variant="pageData.sortOrder === 'desc' ? 'flat' : 'light'"
        size="lg"
        @click="pageData.sortOrder = 'desc'"
      >
        <KunIcon class="text-inherit" name="lucide:arrow-down" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        :variant="pageData.sortOrder === 'asc' ? 'flat' : 'light'"
        size="lg"
        @click="pageData.sortOrder = 'asc'"
      >
        <KunIcon class="text-inherit" name="lucide:arrow-up" />
      </KunButton>
    </div>
  </div>
</template>
