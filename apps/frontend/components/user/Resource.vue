<script setup lang="ts">
import { GALGAME_RESOURCE_PLATFORM_ICON_MAP } from '~/constants/galgameResource'
import { KUN_GALGAME_RESOURCE_PLATFORM_MAP } from '~/constants/galgame'
import { kunUserGalgameResourceNavItem } from '~/constants/user'
import type { GalgameResourceType } from '~/types/api/user'

const props = defineProps<{
  uid: number
  type: GalgameResourceType
}>()

const pageData = reactive({
  page: 1,
  limit: 50,
  type: props.type
})

const activeTab = computed(
  () => useRoute().fullPath.split('/').pop() || 'valid'
)

const { data, status } = await useFetch(`/api/user/${props.uid}/resources`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="space-y-3">
    <KunHeader
      name="Galgame 下载资源列表"
      description="这是您的 Galgame 下载资源列表, 为什么这里的 Galgame 没有预览图! 因为我还在咕咕咕!"
    />

    <KunTab
      :items="kunUserGalgameResourceNavItem(uid)"
      :model-value="activeTab"
      size="sm"
    />

    <div class="flex flex-col space-y-3" v-if="data && data.resources.length">
      <KunCard
        :is-pressable="true"
        v-for="(res, index) in data.resources"
        :key="index"
        :href="`/galgame/${res.gid}`"
      >
        <div>
          {{ getPreferredLanguageText(res.name) }}
        </div>

        <div class="flex items-center justify-between">
          <div class="space-x-2">
            <KunBadge color="primary">
              <KunIcon
                :name="GALGAME_RESOURCE_PLATFORM_ICON_MAP[res.platform]"
              />
              {{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[res.platform] }}
            </KunBadge>

            <KunBadge :color="res.status ? 'danger' : 'success'">
              {{ res.status ? '链接过期' : '链接有效' }}
            </KunBadge>
          </div>

          <div class="text-default-500 text-sm">
            {{ formatDate(res.time, { isShowYear: true }) }}
          </div>
        </div>
      </KunCard>

      <KunPagination
        v-if="data.totalCount > pageData.limit"
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </div>
  </div>
</template>
