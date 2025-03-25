<script setup lang="ts">
import { kunUserTopicNavItem } from '~/constants/user'
import type { TopicType } from '@/types/api/user'

const props = defineProps<{
  uid: number
  type: TopicType
}>()

const pageData = reactive({
  page: 1,
  limit: 50,
  type: props.type
})

const activeTab = computed(
  () => useRoute().fullPath.split('/').pop() || 'publish'
)

const { data, status } = await useFetch(`/api/user/${props.uid}/topics`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="space-y-3">
    <KunHeader
      name="话题列表"
      description="这是您的话题列表, 高级功能还在咕咕咕, 呜呜呜呜呜"
    />

    <KunTab
      :items="kunUserTopicNavItem(uid)"
      :model-value="activeTab"
      size="sm"
    />

    <div class="flex flex-col space-y-3" v-if="data && data.topics.length">
      <KunCard
        :is-pressable="true"
        v-for="(topic, index) in data.topics"
        :key="index"
        :href="`/topic/${topic.tid}`"
      >
        <div>
          {{ topic.title }}
        </div>
        <div class="text-default-500 text-sm">
          {{ formatDate(topic.time, { isShowYear: true }) }}
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
