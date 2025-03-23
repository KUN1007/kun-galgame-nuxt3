<script setup lang="ts">
import { KUN_TOPIC_CATEGORY } from '~/constants/topic'
import { KUN_CATEGORY_DESCRIPTION_MAP } from '~/constants/category'

const route = useRoute()

const categoryName = computed(() => {
  return (route.params as { name: string }).name
})

const { data } = await useFetch(`/api/category`, {
  method: 'GET',
  query: { category: categoryName },
  ...kungalgameResponseHandler
})

useHead({
  title: KUN_TOPIC_CATEGORY[categoryName.value],
  meta: [
    {
      name: 'description',
      content: KUN_CATEGORY_DESCRIPTION_MAP[categoryName.value]
    }
  ]
})
</script>

<template>
  <CategoryContainer
    v-if="data"
    :categories="data"
    :category-name="categoryName"
  />
</template>
