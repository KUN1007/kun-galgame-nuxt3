<script setup lang="ts">
import { kunUserTopicNavItem } from '~/constants/user'
import type { TopicType } from '~/types/api/user'

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
    <KunTab :items="kunUserTopicNavItem(uid)" v-model="activeTab" size="sm" />

    <div class="flex flex-col space-y-3" v-if="data && data.topics.length">
      <KunCard v-for="(topic, index) in data.topics" :key="index">
        <NuxtLink :to="`/topic/${topic.tid}`">
          <div>
            {{ topic.title }}
          </div>
          <div class="text-default-500 text-sm">
            {{ formatDate(topic.time, { isShowYear: true }) }}
          </div>
        </NuxtLink>
      </KunCard>

      <KunPagination
        v-if="data.totalCount > 50"
        :page="pageData.page"
        :limit="pageData.limit"
        :sum="data.totalCount"
        :status="status"
        @set-page="(newPage) => (pageData.page = newPage)"
      />
    </div>
  </div>
</template>
