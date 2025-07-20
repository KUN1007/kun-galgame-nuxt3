<script setup lang="ts">
import {
  kunUserCommentNavItem,
  type KUN_USER_PAGE_COMMENT_TYPE
} from '~/constants/user'

const props = defineProps<{
  uid: number
  type: (typeof KUN_USER_PAGE_COMMENT_TYPE)[number]
}>()

const activeTab = ref(props.type)
const pageData = reactive({
  page: 1,
  limit: 50,
  userId: props.uid,
  type: props.type
})

const { data, status } = await useFetch(`/api/user/${props.uid}/comments`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="space-y-6">
    <KunHeader
      name="评论列表"
      description="这是您在论坛中发布的所有评论的列表, 这里仅显示了话题下的评论, Galgame 下的评论还在咕咕咕, 杂鱼杂鱼臭杂鱼"
    />

    <KunTab
      :items="kunUserCommentNavItem(uid)"
      :model-value="activeTab"
      size="sm"
    />

    <div class="flex flex-col space-y-3" v-if="data && data.comments.length">
      <KunCard
        :is-pressable="true"
        v-for="(comment, index) in data.comments"
        :key="index"
        :href="`/topic/${comment.topicId}`"
      >
        <div>
          {{ comment.content }}
        </div>
        <div class="text-default-500 text-sm">
          {{ formatDate(comment.created, { isShowYear: true }) }}
        </div>
      </KunCard>

      <KunPagination
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </div>

    <KunNull
      v-if="data && !data.comments.length"
      description="这只笨蛋萝莉没有发布过任何评论"
    />
  </div>
</template>
