<script setup lang="ts">
import { KUN_WEBSITE_CATEGORY_MAP } from '~/constants/website'

const route = useRoute()
const categoryName = computed(() => {
  return (route.params as { name: string }).name
})

const { data } = await useFetch(`/api/website-category/${categoryName.value}`, {
  method: 'GET',
  watch: false,
  query: { name: categoryName.value },
  ...kungalgameResponseHandler
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    content-class="space-y-6"
  >
    <KunHeader
      :name="KUN_WEBSITE_CATEGORY_MAP[categoryName]"
      :description="`分类 “${KUN_WEBSITE_CATEGORY_MAP[categoryName]}”下的所有网站`"
      :is-show-divider="false"
    />

    <template v-if="data">
      <div v-if="data.length">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <WebsiteCard
            v-for="website in data"
            :key="website.id"
            :website="website"
          />
        </div>
      </div>

      <KunNull
        v-else
        :description="`${KUN_WEBSITE_CATEGORY_MAP[categoryName]} 分类下暂无网站`"
      />
    </template>
  </KunCard>
</template>
