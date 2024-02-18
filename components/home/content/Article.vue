<script setup lang="ts">
const { topic, topics, savedPosition } = storeToRefs(useTempHomeStore())

const content = ref<HTMLElement>()
const isLoadingComplete = ref(false)

const getTopics = async () => {
  const { data } = await useFetch('/api/home/topic', {
    method: 'GET',
    query: {
      category: topic.value.category,
      page: topic.value.page,
      limit: topic.value.limit,
      sortField: topic.value.sortField,
      sortOrder: topic.value.sortOrder,
    },
    ...kungalgameResponseHandler,
  })
  return data.value ?? []
}

if (!topics.value.length) {
  topics.value = await getTopics()
}

watch(
  () => [topic.value.category, topic.value.sortField, topic.value.sortOrder],
  async () => {
    isLoadingComplete.value = false
    useTempHomeStore().resetHomePageStatus()
    topics.value = await getTopics()
  }
)

const scrollHandler = async () => {
  if (isScrollAtBottom() && !isLoadingComplete.value) {
    topic.value.page++

    const newData = await getTopics()

    if (newData.length < 10) {
      isLoadingComplete.value = true
    }

    topics.value = topics.value.concat(newData)
  }
}

const isScrollAtBottom = () => {
  if (content.value) {
    const scrollHeight = content.value.scrollHeight
    const scrollTop = content.value.scrollTop
    const clientHeight = content.value.clientHeight

    savedPosition.value = scrollTop

    const errorMargin = 1.007
    return Math.abs(scrollHeight - scrollTop - clientHeight) < errorMargin
  }
}

onMounted(async () => {
  content.value?.scrollTo({
    top: savedPosition.value,
    left: 0,
  })

  const element = content.value
  if (element) {
    element.addEventListener('scroll', scrollHandler)
  }
})

onBeforeUnmount(() => {
  const element = content.value
  if (element) {
    element.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<template>
  <div class="topic-container" ref="content">
    <div
      v-for="topic in topics"
      :key="topic.tid"
      :class="
        hourDiff(topic.upvote_time, 10) ? 'kungalgame-comet-surround' : ''
      "
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>

      <HomeContentSingleTopic :topic="topic" />
    </div>

    <KunSkeletonHomeTopic v-if="!isLoadingComplete" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/css/effect/effect.scss';
.topic-container {
  width: 100%;
  height: 100%;
  padding: 17px;
  padding-right: 10px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;

  & > div {
    margin-bottom: 17px;
  }
}

.kungalgame-comet-surround {
  padding: 0;
  flex-shrink: 0;
  border: 2px solid var(--kungalgame-red-4);
  margin-top: 10px;

  & > div {
    margin: 0 !important;
  }
}
</style>
