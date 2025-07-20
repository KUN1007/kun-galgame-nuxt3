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

useKunSeoMeta({
  title: KUN_TOPIC_CATEGORY[categoryName.value],
  description: KUN_CATEGORY_DESCRIPTION_MAP[categoryName.value]
})
</script>

<template>
  <CategoryContainer
    v-if="data"
    :sections="data"
    :category-name="categoryName"
  />
</template>
