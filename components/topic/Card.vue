<script setup lang="ts">
import type { TopicCard } from '~/types/api/topic'

const props = defineProps<{
  topic: TopicCard
}>()

const actionsCount = computed(() => props.topic.replies + props.topic.comments)
</script>

<template>
  <NuxtLink
    class="group relative flex flex-col gap-1 rounded-lg border p-4 shadow transition-all hover:shadow-md"
    :to="`/topic/${props.topic.tid}`"
  >
    <h3
      class="line-clamp-2 text-lg font-medium text-gray-900 dark:text-gray-100"
    >
      {{ topic.title }}
    </h3>

    <TopicIntroduction
      :section="props.topic.section"
      :tags="props.topic.tags"
    />

    <div class="status">
      <span>
        <Icon class="icon" name="lucide:eye" />
        <span>{{ props.topic.views }}</span>
      </span>

      <span>
        <Icon class="icon" name="lucide:thumbs-up" />
        <span v-if="props.topic.likes">{{ props.topic.likes }}</span>
      </span>

      <span>
        <Icon class="icon" name="carbon:reply" />
        <span v-if="actionsCount">{{ actionsCount }}</span>
      </span>
    </div>

    <TopicUser :user="props.topic.user" :time="props.topic.time" />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.topic {
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  cursor: pointer;
  max-width: 300px;
  padding: 10px;
  transition: all 0.2s;
  border-radius: 10px;

  &:hover {
    box-shadow: var(--shadow);

    .title {
      color: var(--kungalgame-blue-5);
    }
  }
}

.title {
  font-size: 18px;
  color: var(--kungalgame-font-color-3);
}

.status {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  margin-top: 10px;

  span {
    display: flex;
    align-items: center;
    margin-right: 8px;

    span {
      margin-left: 4px;
    }
  }
}
</style>
