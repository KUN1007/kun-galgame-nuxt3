<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

defineProps<{
  topic: TopicDetail
}>()
</script>

<template>
  <div
    :class="
      cn(
        'outline-primary flex justify-between gap-3 rounded-lg outline-offset-2'
      )
    "
    id="0"
  >
    <TopicDetailMasterUser v-if="topic.user" :user="topic.user" />

    <KunCard
      :is-transparent="false"
      :is-hoverable="false"
      class-name="w-full"
      content-class="gap-3"
    >
      <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
        {{ topic.title }}
      </h1>

      <TopicTagGroup
        :section="topic.section"
        :tags="topic.tag"
        :upvote-time="topic.upvoteTime"
      />

      <div class="text-default-500 flex items-center space-x-4 text-sm">
        <span>{{ `浏览数 - ${topic.view}` }}</span>
        <span>
          {{
            `发布于 - ${formatDate(topic.created, { isShowYear: true, isPrecise: true })}`
          }}
        </span>
      </div>

      <TopicDetailUser
        class-name="lg:hidden"
        :user="topic.user"
        :created="topic.created"
        :edited="topic.edited"
        :topic-id="topic.id"
        :floor="0"
        :show-addition="false"
      />

      <KunContent class="kun-master" :content="topic.contentHtml" />

      <p class="text-default-500 ml-auto text-sm" v-if="topic.edited">
        {{
          `重新编辑于 - ${formatDate(topic.edited, { isShowYear: true, isPrecise: true })}`
        }}
      </p>

      <TopicFooter :topic="topic" />
    </KunCard>
  </div>
</template>
