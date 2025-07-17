<script setup lang="ts">
import { KUN_WEBSITE_CATEGORY_MAP } from '~/constants/website'
import type { WebsiteCard, WebsiteTag } from '~/types/api/website'
import type {
  CreateWebsitePayload,
  UpdateWebsitePayload
} from '~/components/website/modal/types'

const { data } = await useFetch('/api/website', {
  method: 'GET',
  ...kungalgameResponseHandler
})

const searchQuery = ref('')
const showWebsiteModal = ref(false)
const editingWebsite = ref<CreateWebsitePayload | undefined>(undefined)

const calculateTagSum = (tags: WebsiteTag[]): number => {
  return tags.reduce((sum, tag) => sum + tag.level, 0)
}

const filteredAndSortedWebsites = computed(() => {
  if (!data.value || !Array.isArray(data.value)) {
    return {}
  }

  const lowerCaseQuery = searchQuery.value.toLowerCase()
  const filteredList =
    lowerCaseQuery === ''
      ? data.value
      : data.value.filter(
          (site) =>
            site.name.toLowerCase().includes(lowerCaseQuery) ||
            site.description.toLowerCase().includes(lowerCaseQuery) ||
            site.domain.includes(lowerCaseQuery)
        )

  const categorized = filteredList.reduce(
    (accumulator, site) => {
      const category = site.category
      if (!accumulator[category]) {
        accumulator[category] = []
      }
      accumulator[category].push(site)
      return accumulator
    },
    {} as Record<string, WebsiteCard[]>
  )

  for (const category in categorized) {
    categorized[category].sort((a, b) => {
      const sumA = calculateTagSum(a.tags)
      const sumB = calculateTagSum(b.tags)
      return sumB - sumA
    })
  }

  return categorized
})

const navigateToWebsite = (domain: string) => {
  navigateTo(`/website/${domain}`)
}

const openCreateWebsiteModal = () => {
  editingWebsite.value = undefined
  showWebsiteModal.value = true
}

const handleCreateWebsite = async (
  data: CreateWebsitePayload | UpdateWebsitePayload
) => {}
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
        <div class="space-y-3">
          <KunInput
            v-model="searchQuery"
            type="text"
            placeholder="搜索 Galgame 网站"
          />

          <div class="flex justify-end">
            <KunButton @click="openCreateWebsiteModal"> 创建新网站 </KunButton>
          </div>
        </div>
      </template>
    </KunHeader>

    <WebsiteModalWebsite
      v-model="showWebsiteModal"
      :initial-data="editingWebsite"
      @submit="handleCreateWebsite"
    />

    <div v-for="(sites, category) in filteredAndSortedWebsites" :key="category">
      <div class="mb-3 flex items-center space-x-3">
        <h2 class="text-default-900 text-2xl">
          {{ KUN_WEBSITE_CATEGORY_MAP[category] }}
        </h2>
        <KunBadge> {{ sites.length }} 个网站 </KunBadge>
      </div>

      <div
        class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <WebsiteCard
          v-for="website in sites"
          :key="website.id"
          :website="website"
          @click="navigateToWebsite(website.domain)"
        />
      </div>
    </div>
  </KunCard>
</template>
