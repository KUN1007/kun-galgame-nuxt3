<script setup lang="ts">
import type { TopicCard } from '~/types/api/topic'

const props = defineProps<{
  topic: TopicCard
}>()

const actionsCount = computed(
  () => props.topic.replyCount + props.topic.commentCount
)
</script>

<template>
  <KunCard
    :is-pressable="true"
    :is-transparent="false"
    content-class="justify-between gap-2"
    :href="`/topic/${props.topic.id}`"
  >
    <h3 class="line-clamp-2 text-lg font-medium">
      {{ topic.title }}
    </h3>

    <TopicTagGroup
      :section="props.topic.section"
      :tags="props.topic.tag"
      :has-best-answer="topic.hasBestAnswer"
      :is-poll-topic="topic.isPollTopic"
      :is-n-s-f-w-topic="topic.isNSFWTopic"
    />

    <div class="text-default-700 flex items-center gap-4 text-sm">
      <span class="flex items-center gap-1 text-inherit">
        <KunIcon class="h-4 w-4 text-inherit" name="lucide:eye" />
        <span class="text-inherit">{{ formatNumber(props.topic.view) }}</span>
      </span>

      <span class="flex items-center gap-1 text-inherit">
        <KunIcon class="h-4 w-4 text-inherit" name="lucide:thumbs-up" />
        <span class="text-inherit" v-if="props.topic.likeCount">
          {{ props.topic.likeCount }}
        </span>
      </span>

      <span class="flex items-center gap-1 text-inherit">
        <KunIcon class="h-4 w-4 text-inherit" name="carbon:reply" />
        <span class="text-inherit" v-if="actionsCount">{{ actionsCount }}</span>
      </span>
    </div>

    <div class="text-default-600 flex items-center gap-1 text-sm">
      <KunAvatar :disable-floating="true" :user="topic.user" size="xs" />
      {{
        `${topic.user.name} · ${formatTimeDifference(topic.statusUpdateTime)}`
      }}
    </div>
  </KunCard>
</template>
