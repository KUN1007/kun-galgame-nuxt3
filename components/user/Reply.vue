<script setup lang="ts">
import {
  kunUserReplyNavItem,
  type KUN_USER_PAGE_REPLY_TYPE
} from '~/constants/user'

const props = defineProps<{
  uid: number
  type: (typeof KUN_USER_PAGE_REPLY_TYPE)[number]
}>()

const activeTab = ref(props.type)
const pageData = reactive({
  page: 1,
  limit: 50,
  userId: props.uid,
  type: props.type
})

const { data, status } = await useFetch(`/api/user/${props.uid}/replies`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="space-y-6">
    <KunHeader
      name="回复列表"
      description="这是您在论坛中发布的所有回复的列表, 高级功能还在开发中, 杂鱼杂鱼臭杂鱼"
    />

    <KunTab
      :items="kunUserReplyNavItem(uid)"
      :model-value="activeTab"
      size="sm"
    />

    <div v-if="data" class="flex flex-col space-y-3">
      <KunCard
        :is-pressable="true"
        v-for="(reply, index) in data.replies"
        :key="index"
        :href="`/topic/${reply.topicId}`"
      >
        <div>
          {{ markdownToText(reply.content) }}
        </div>
        <div class="text-default-500 text-sm">
          {{ formatDate(reply.created, { isShowYear: true }) }}
        </div>
      </KunCard>

      <KunPagination
        v-if="data.totalCount > pageData.limit"
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </div>

    <KunNull
      v-if="data && !data.replies.length"
      description="这只笨蛋萝莉没有发布过任何回复"
    />
  </div>
</template>
