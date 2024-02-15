<script setup lang="ts">
import type { PoolTopic } from '~/types/api/pool'

const props = defineProps<{
  topic: PoolTopic
}>()

const { locale } = useI18n()
const localePath = useLocalePath()

const topic = computed(() => props.topic)
const { formattedENDate, formattedCNDate } = formatTimeI18n(topic.value.time)

const loliTime = computed(() => {
  if (locale.value === 'en') {
    return formattedENDate
  }

  if (locale.value === 'zh') {
    return formattedCNDate
  }

  return ''
})
</script>

<template>
  <NuxtLink class="topic" :to="localePath(`/topic/${topic.tid}`)">
    <div class="title">
      {{ topic.title }}
    </div>

    <div class="content">{{ markdownToText(topic.content) }}</div>

    <div class="status">
      <span>
        <Icon name="ic:outline-remove-red-eye" />
        {{ topic.views }}
      </span>

      <span>
        <Icon name="line-md:thumbs-up-twotone" />
        {{ topic.likesCount }}
      </span>
    </div>

    <div class="time">
      <Icon name="eos-icons:hourglass" class="hourglass" />
      <div>{{ loliTime }}</div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.topic {
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  box-shadow: var(--shadow);
  cursor: pointer;
  max-width: 300px;
  padding: 10px;
  border: 2px solid var(--kungalgame-trans-blue-2);
  border-radius: 10px;

  &:hover {
    border: 2px solid var(--kungalgame-blue-5);
  }
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
  font-weight: bold;
  color: var(--kungalgame-blue-5);
  flex-shrink: 0;
  margin-bottom: 10px;
}

.content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow-wrap: break-word;
  font-size: 14px;
  padding: 0 10px;
  margin-bottom: 10px;
}

.status {
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  overflow: hidden;
  flex-wrap: wrap;
  margin-bottom: 10px;

  span {
    display: flex;
    align-items: center;
  }
}

.time {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
  letter-spacing: 1px;
  overflow: hidden;

  .hourglass {
    flex-shrink: 0;
    color: var(--kungalgame-purple-4);
  }
}
</style>
