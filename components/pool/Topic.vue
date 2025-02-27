<script setup lang="ts">
import type { PoolTopic } from '~/types/api/pool'

const props = defineProps<{
  topic: PoolTopic
}>()

const actionsCount = computed(() => props.topic.replies + props.topic.comments)
</script>

<template>
  <NuxtLink
    class="topic"
    :to="`/topic/${props.topic.tid}`"
    v-kun-gradient="{
      color: '--kungalgame-trans-blue-0',
      radius: 70
    }"
  >
    <div class="title">{{ topic.title }}</div>

    <PoolUser :user="props.topic.user" :time="props.topic.time" />

    <PoolIntroduction :section="props.topic.section" :tags="props.topic.tags" />

    <div class="status">
      <span>
        <Icon class="icon" name="lucide:mouse-pointer-click" />
        <span>{{ props.topic.views }}</span>
      </span>

      <span>
        <Icon class="icon" name="lucide:thumbs-up" />
        <span v-if="props.topic.likes">{{ props.topic.likes }}</span>
      </span>

      <span>
        <Icon class="icon" name="lucide:reply" />
        <span v-if="actionsCount">{{ actionsCount }}</span>
      </span>
    </div>
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
