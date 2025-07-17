<script setup lang="ts">
import { KUN_WEBSITE_TAG_MAP } from '~/constants/website'

const route = useRoute()
const tagName = computed(() => {
  return (route.params as { name: string }).name
})

const { data } = await useFetch(`/api/website-tag/${tagName.value}`, {
  method: 'GET',
  watch: false,
  query: { name: tagName.value },
  ...kungalgameResponseHandler
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    content-class="space-y-6"
    v-if="data"
  >
    <KunHeader
      :name="KUN_WEBSITE_TAG_MAP[data.name]"
      :description="data.description"
      :is-show-divider="false"
    />

    <div v-if="data.websites.length">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <WebsiteCard
          v-for="website in data.websites"
          :key="website.id"
          :website="website"
        />
      </div>
    </div>

    <KunNull
      v-else
      :description="`${KUN_WEBSITE_TAG_MAP[tagName]} 标签下暂无网站`"
    />
  </KunCard>
</template>
