<script setup lang="ts">
import type { PoolTopic } from '~/types/api/pool'

// rgba(208, 234, 255, 0.31) is good
const light = `rgba(${randomNum(200, 255)}, ${randomNum(200, 255)}, ${randomNum(
  200,
  255
)}, ${randomNum(30, 70) / 100})`

const dark = `rgba(${randomNum(0, 55)}, ${randomNum(0, 55)}, ${randomNum(
  0,
  55
)}, ${randomNum(30, 70) / 100})`

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
  border: 1px solid var(--kungalgame-blue-1);
  border-radius: 5px;
  color: var(--kungalgame-font-color-3);
  cursor: pointer;
  box-shadow: var(--shadow);
  max-width: 300px;

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
  margin-top: 7px;
  padding: 0 7px;
  font-weight: bold;
  color: var(--kungalgame-font-color-2);
  flex-shrink: 0;
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
  margin: 7px 0;
}

.status {
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  overflow: hidden;
  flex-wrap: wrap;

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
  padding: 7px;

  .hourglass {
    flex-shrink: 0;
    margin: 0 5px;
    color: var(--kungalgame-purple-4);
  }
}
</style>
