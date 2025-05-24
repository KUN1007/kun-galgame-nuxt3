<script setup lang="ts">
import { kunUserGalgameNavItem } from '~/constants/user'
import type { GalgameType } from '~/types/api/user'

const props = defineProps<{
  uid: number
  type: GalgameType
}>()

const pageData = reactive({
  page: 1,
  limit: 50,
  type: props.type
})

const activeTab = computed(
  () => useRoute().fullPath.split('/').pop() || 'publish'
)

const { data, status } = await useFetch(`/api/user/${props.uid}/galgames`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="space-y-3">
    <KunHeader
      name="Galgame 列表"
      description="这是您的 Galgame 列表, 为什么这里的 Galgame 没有预览图! 因为我还在咕咕咕!"
    />

    <KunTab
      :items="kunUserGalgameNavItem(uid)"
      :model-value="activeTab"
      size="sm"
    />

    <div class="flex flex-col space-y-3" v-if="data && data.galgames.length">
      <KunCard
        :is-pressable="true"
        v-for="(galgame, index) in data.galgames"
        :key="index"
        :href="`/galgame/${galgame.gid}`"
      >
        <div>
          {{ getPreferredLanguageText(galgame.name) }}
        </div>
        <div class="text-default-500 text-sm">
          {{ formatDate(galgame.time, { isShowYear: true }) }}
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
