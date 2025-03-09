<script setup lang="ts">
import { KUN_TOPIC_DETAIL_STATUS } from '~/constants/topic'
import type { TopicDetail } from '~/types/api/topic'

const props = defineProps<{
  topic: TopicDetail
}>()

const loliStatus = computed(() => {
  if (hourDiff(props.topic.upvoteTime, 10)) {
    return 'featured'
  }

  const statusMap: Record<number, string> = {
    0: 'normal',
    1: 'banned',
    2: 'pinned',
    3: 'essential'
  }
  return statusMap[props.topic.status]
})
</script>

<template>
  <div class="flex justify-between gap-3" id="k0">
    <TopicDetailUser v-if="topic.user" :user="topic.user" />

    <KunCard
      :is-transparent="false"
      :is-hoverable="false"
      class-name="w-full"
      content-class="gap-3"
    >
      <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
        {{ topic.title }}
      </h1>

      <div class="flex flex-wrap gap-1">
        <TopicDetailSection :section="topic.section" />
        <KunBadge v-for="(tag, index) in topic.tags" :key="index">
          {{ tag }}
        </KunBadge>
      </div>

      <div class="text-default-500 flex items-center space-x-4 text-sm">
        <span>{{ `浏览数 - ${topic.views}` }}</span>
        <span>
          {{
            `发布于 - ${formatDate(topic.time, { isShowYear: true, isPrecise: true })}`
          }}
        </span>
      </div>

      <KunContent :content="topic.content" />

      <p class="text-default-500 ml-auto text-sm" v-if="topic.edited">
        {{
          `重新编辑于 - ${formatDate(topic.edited, { isShowYear: true, isPrecise: true })}`
        }}
      </p>

      <TopicFooter :topic="topic" />
    </KunCard>

    <TopicDetailTableOfContent />
  </div>
</template>
