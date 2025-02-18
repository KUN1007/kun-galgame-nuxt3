<script setup lang="ts">
import { KUN_TOPIC_CATEGORY } from '~/constants/topic'

type Category = 'galgame' | 'technique' | 'others'

const availableCategory: Category[] = ['galgame', 'technique', 'others']

const { category } = storeToRefs(usePersistCategoryStore())

const { data, pending } = await useLazyFetch(`/api/category`, {
  method: 'GET',
  query: { category },
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div>
      <span
        v-for="(cat, index) in availableCategory"
        :key="index"
        @click="category = cat"
        :class="category === cat ? 'active' : ''"
      >
        {{ KUN_TOPIC_CATEGORY[cat] }}
      </span>
    </div>

    <CategorySection v-if="data && !pending" :categories="data" />
    <KunSkeletonCategory v-if="pending" />

    <p class="hint">页面数据十七分钟更新一次</p>
    <KunFooter />
  </div>
</template>
