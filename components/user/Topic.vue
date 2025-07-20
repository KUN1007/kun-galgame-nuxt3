<script setup lang="ts">
import {
  kunUserTopicNavItem,
  type KUN_USER_PAGE_TOPIC_TYPE
} from '~/constants/user'

const props = defineProps<{
  uid: number
  type: (typeof KUN_USER_PAGE_TOPIC_TYPE)[number]
}>()

const activeTab = ref(props.type)
const pageData = reactive({
  page: 1,
  limit: 50,
  type: props.type,
  userId: props.uid
})

const { data, status } = await useFetch(`/api/user/${props.uid}/topics`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

const handleUpdateTopicHideStatus = async (topicId: number) => {
  const res = await useComponentMessageStore().alert(
    '八嘎杂鱼笨蛋萝莉, 你要取消隐藏该话题吗, 取消隐藏后该话题将对所有人可见'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/topic/${topicId}/hide`, {
    method: 'PUT',
    watch: false,
    body: { topicId },
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('取消隐藏话题成功', 'success')
    await navigateTo(`/topic/${topicId}`)
  }
}
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
      <template v-if="pageData.type !== 'topic_hide'">
        <KunCard
          :is-pressable="true"
          v-for="(topic, index) in data.topics"
          :key="index"
          :href="`/topic/${topic.id}`"
        >
          <div>
            {{ topic.title }}
          </div>
          <div class="text-default-500 text-sm">
            {{ formatDate(topic.created, { isShowYear: true }) }}
          </div>
        </KunCard>
      </template>

      <template v-else>
        <KunCard
          :is-pressable="false"
          :is-hoverable="false"
          :is-transparent="true"
          v-for="(topic, index) in data.topics"
          :key="index"
        >
          <KunLink :to="`/topic/${topic.id}`">
            {{ topic.title }}
          </KunLink>
          <div
            class="text-default-500 flex items-center justify-between text-sm"
          >
            <span>{{ formatDate(topic.created, { isShowYear: true }) }}</span>
            <KunButton
              @click="handleUpdateTopicHideStatus(topic.id)"
              size="sm"
              variant="flat"
              color="primary"
            >
              取消隐藏
            </KunButton>
          </div>
        </KunCard>
      </template>
    </div>

    <KunPagination
      v-if="data && data.totalCount > pageData.limit"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />

    <KunNull
      v-if="data && !data.topics.length"
      description="这只笨蛋萝莉没有发布过任何话题"
    />
  </div>
</template>
