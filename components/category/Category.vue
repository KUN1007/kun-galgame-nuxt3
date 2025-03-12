<script setup lang="ts">
import { kunCategoryAvailableItem, type Category } from '~/constants/category'

const { category } = storeToRefs(usePersistCategoryStore())

const { data } = await useFetch(`/api/category`, {
  method: 'GET',
  query: { category },
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="flex flex-col space-y-4">
    <KunTab
      :items="kunCategoryAvailableItem"
      :default-value="category"
      @set="(value) => (category = value as Category)"
    />

    <CategorySection v-if="data" :categories="data" />

    <KunFooter />
  </div>
</template>
