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
  <div class="flex justify-between">
    <div class="flex">
      <KunSelect
        :model-value="pageData.sortField"
        :options="topicSortFieldOptions"
        @set="
          (value) => (pageData.sortField = value as typeof pageData.sortField)
        "
        position="bottom"
      >
        <span>{{ KUN_TOPIC_PAGE_SORT_FIELD[pageData.sortField] }}</span>
      </KunSelect>

      <KunSelect
        :options="topicSortCategoryOptions"
        :default-value="pageData.category"
        @set="
          (value) => (pageData.category = value as typeof pageData.category)
        "
        position="bottom"
      >
        <span>{{ KUN_TOPIC_CATEGORY[pageData.category] }}</span>
      </KunSelect>
    </div>

    <div class="flex items-center gap-2">
      <KunButton
        :is-icon-only="true"
        :variant="layout === 'grid' ? 'flat' : 'light'"
        @click="layout = 'grid'"
      >
        <Icon class="text-inherit" name="lucide:layout-grid" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        :variant="layout === 'list' ? 'flat' : 'light'"
        @click="layout = 'list'"
      >
        <Icon class="text-inherit" name="lucide:list" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        :variant="pageData.sortOrder === 'desc' ? 'flat' : 'light'"
        @click="pageData.sortOrder = 'desc'"
      >
        <Icon class="text-inherit" name="lucide:arrow-down" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        :variant="pageData.sortOrder === 'asc' ? 'flat' : 'light'"
        @click="pageData.sortOrder = 'asc'"
      >
        <Icon class="text-inherit" name="lucide:arrow-up" />
      </KunButton>
    </div>
  </div>
</template>
