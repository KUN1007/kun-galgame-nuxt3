<script setup lang="ts">
import { KUN_WEBSITE_CATEGORY_MAP } from '~/constants/galgameWebsite'
import type { WebsiteCard, WebsiteTag } from '~/types/api/website'
import type {
  CreateWebsitePayload,
  UpdateWebsitePayload
} from '~/components/website/modal/types'

const { data } = await useFetch('/api/website', {
  method: 'GET',
  ...kungalgameResponseHandler
})

const { role } = usePersistUserStore()
const searchQuery = ref('')
const showWebsiteModal = ref(false)
const editingWebsite = ref<CreateWebsitePayload | undefined>(undefined)

const filteredAndSortedWebsites = computed(() => {
  if (!data.value || !Array.isArray(data.value)) {
    return []
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
      return a.price - b.price
    })
  }

  // ordered sort, ['resource', 'community', 'telegram', 'other']
  return Object.keys(KUN_WEBSITE_CATEGORY_MAP)
    .map((categoryKey) => {
      const sites = categorized[categoryKey] || []
      return {
        key: categoryKey,
        name: KUN_WEBSITE_CATEGORY_MAP[categoryKey],
        sites: sites.reverse()
      }
    })

    .filter((categoryGroup) => categoryGroup.sites.length > 0)
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
) => {
  const result = await $fetch('/api/website', {
    method: 'POST',
    watch: false,
    body: data,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('创建网站成功', 'success')
  }
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
      description="世界上最全的 Galgame 资源网站, 社区网站, 论坛网站, 资讯网站, Galgame Wiki, Telegram 社群 等 Galgame 网站汇总, 仅收录 Galgame 相关的网站。本 Wiki 仅会收录免费网站, 并且严格禁止任何有付费行为的网站。"
    >
      <template #endContent>
        <div class="space-y-3">
          <p class="text-default-500">
            当前本页面正在不断更新中, 默认仅显示 SFW 的网站, 查看 NSFW
            网站请在设置面板打开 NSFW 开关。
          </p>
          <p class="text-default-500">
            关于 Galgame 网站 Wiki 请查看
            <KunLink to="/doc/galgame/galgame-website-wiki">
              Galgame 网站 Wiki
            </KunLink>
            , 如果有数据错误请
            <KunLink to="/doc/notice/contact"> 联系我们 </KunLink>。
          </p>
          <KunInput
            v-model="searchQuery"
            type="text"
            placeholder="搜索 Galgame 网站"
          />

          <div v-if="role > 2" class="flex justify-end">
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

    <div
      v-for="categoryGroup in filteredAndSortedWebsites"
      :key="categoryGroup.key"
    >
      <div class="mb-3 flex items-center space-x-3">
        <h2 class="text-default-900 text-2xl">
          {{ categoryGroup.name }}
        </h2>
        <KunBadge> {{ categoryGroup.sites.length }} 个网站 </KunBadge>
      </div>

      <div
        class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <WebsiteCard
          v-for="website in categoryGroup.sites"
          :key="website.id"
          :website="website"
          @click="navigateToWebsite(website.domain)"
        />
      </div>
    </div>
  </KunCard>
</template>
