<script setup lang="ts">
import type { TopicCard } from '~/types/api/topic'

const props = defineProps<{
  topic: TopicCard
}>()

const actionsCount = computed(() => props.topic.replies + props.topic.comments)
</script>

<template>
  <KunCard
    :is-pressable="true"
    :is-transparent="false"
    content-class="justify-between gap-2"
    :href="`/topic/${props.topic.tid}`"
  >
    <h3 class="line-clamp-2 text-lg font-medium">
      {{ topic.title }}
    </h3>

    <TopicTagGroup :section="props.topic.section" :tags="props.topic.tags" />

    <div class="text-default-700 flex items-center gap-4 text-sm">
      <span class="flex items-center gap-1 text-inherit">
        <KunIcon class="h-4 w-4 text-inherit" name="lucide:eye" />
        <span class="text-inherit">{{ formatNumber(props.topic.views) }}</span>
      </span>

      <span class="flex items-center gap-1 text-inherit">
        <KunIcon class="h-4 w-4 text-inherit" name="lucide:thumbs-up" />
        <span class="text-inherit" v-if="props.topic.likes">
          {{ props.topic.likes }}
        </span>
      </span>

      <span class="flex items-center gap-1 text-inherit">
        <KunIcon class="h-4 w-4 text-inherit" name="carbon:reply" />
        <span class="text-inherit" v-if="actionsCount">{{ actionsCount }}</span>
      </span>
    </div>

    <div class="text-default-600 flex items-center gap-1 text-sm">
      <KunAvatar :user="topic.user" size="xs" />
      {{ `${topic.user.name} · ${formatTimeDifference(topic.time)}` }}
    </div>
  </KunCard>
</template>
