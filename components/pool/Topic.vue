<script setup lang="ts">
import type { PoolTopic } from '~/types/api/pool'

const light = `rgba(${randomNum(200, 255)}, ${randomNum(200, 255)}, ${randomNum(
  200,
  255
)}, ${randomNum(60, 80) / 100})`

const dark = `rgba(${randomNum(0, 55)}, ${randomNum(0, 55)}, ${randomNum(
  0,
  55
)}, ${randomNum(60, 80) / 100})`

const props = defineProps<{
  topic: PoolTopic
}>()

const color = ref(light)
const { locale } = useI18n()
const colorMode = useColorMode()
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

onMounted(() => {
  if (colorMode.value === 'dark') {
    color.value = dark
  } else {
    color.value = light
  }

  watch(
    () => colorMode.value,
    () => {
      if (colorMode.value === 'dark') {
        color.value = dark
      } else {
        color.value = light
      }
    }
  )
})
</script>

<template>
  <RouterLink class="topic" :to="`/topic/${topic.tid}`">
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
  </RouterLink>
</template>

<style lang="scss" scoped>
.topic {
  display: flex;
  flex-direction: column;
  background-color: v-bind(color);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  color: var(--kungalgame-font-color-3);
  cursor: pointer;
  box-shadow: var(--kungalgame-shadow-0);
  max-width: 300px;
  padding: 10px;

  &:hover {
    transition: all 0.2s;
    background-color: var(--kungalgame-trans-white-2);
    box-shadow: var(--kungalgame-shadow-1);
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
