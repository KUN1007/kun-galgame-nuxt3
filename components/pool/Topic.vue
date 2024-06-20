<script setup lang="ts">
import type { PoolTopic } from '~/types/api/pool'

const props = defineProps<{
  topic: PoolTopic
}>()

const actionsCount = computed(() => props.topic.replies + props.topic.comments)
</script>

<template>
  <NuxtLinkLocale class="topic" :to="`/topic/${props.topic.tid}`">
    <div class="title">
      {{ topic.title }}
    </div>

    <PoolUser :user="props.topic.user" :time="props.topic.time" />

    <PoolIntroduction :section="props.topic.section" :tags="props.topic.tags" />

    <div class="status">
      <span>
        <Icon name="lucide:mouse-pointer-click" />
        <span>{{ props.topic.views }}</span>
      </span>

      <span>
        <Icon name="lucide:thumbs-up" />
        <span v-if="props.topic.likes">{{ props.topic.likes }}</span>
      </span>

      <span>
        <Icon name="lucide:reply" />
        <span v-if="actionsCount">{{ actionsCount }}</span>
      </span>
    </div>
  </NuxtLinkLocale>
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

  @include kun-blur;

  &:hover {
    box-shadow: var(--kungalgame-shadow-0);
    transform: translateY(-7px);
    z-index: 1;
  }
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
  margin-bottom: 10px;
  color: var(--kungalgame-font-color-3);
  flex-shrink: 0;
}

.status {
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  overflow: hidden;
  flex-wrap: wrap;
  margin: 10px 0;

  span {
    display: flex;
    align-items: center;

    span {
      margin-left: 5px;
    }
  }
}
</style>
