<script setup lang="ts">
const route = useRoute()

const categoryName = computed(() => {
  return (route.params as { name: string }).name
})

const { data } = await useFetch(`/api/category`, {
  method: 'GET',
  query: { category: categoryName },
  ...kungalgameResponseHandler
})
</script>

<template>
  <CategorySection v-if="data" :categories="data" />
</template>
