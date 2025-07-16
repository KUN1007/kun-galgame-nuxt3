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
  >
    <KunHeader
      :name="KUN_WEBSITE_TAG_MAP[tagName]"
      :description="`标签 “${KUN_WEBSITE_TAG_MAP[tagName]}”下的所有网站`"
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
        :description="`${KUN_WEBSITE_TAG_MAP[tagName]} 标签下暂无网站`"
      />
    </template>
  </KunCard>
</template>
