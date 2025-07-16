<script setup lang="ts">
import { KUN_WEBSITE_CATEGORY_MAP } from '~/constants/website'
import type { WebsiteCard } from '~/types/api/website'

const { data } = await useFetch('/api/website', {
  method: 'GET',
  ...kungalgameResponseHandler
})

const searchQuery = ref('')

const navigateToWebsite = (domain: string) => {
  navigateTo(`/website/${domain}`)
}
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    content-class="space-y-6"
  >
    <KunHeader
      name="Galgame 网站 Wiki"
      description="世界上最全的 Galgame 资源网站, 社区网站, Telegram 社群列表"
      :is-show-divider="false"
    >
      <template #endContent>
        <KunInput
          v-model="searchQuery"
          type="text"
          placeholder="搜索 Galgame 网站"
        />
      </template>
    </KunHeader>

    <div v-for="(web, category) in data" :key="category">
      <div class="mb-3 flex items-center space-x-3">
        <h2 class="text-2xl text-slate-900">
          {{ KUN_WEBSITE_CATEGORY_MAP[category] }}
        </h2>
        <KunBadge> {{ web.length }} 个网站 </KunBadge>
      </div>

      <div
        class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <WebsiteCard
          v-for="website in web"
          :key="website.id"
          :website="website"
          @click="navigateToWebsite(website.domain)"
        />
      </div>
    </div>
  </KunCard>
</template>
