<script setup lang="ts">
const { topic } = storeToRefs(useTempHomeStore())
const content = ref<HTMLElement>()

const getTopics = async () => {
  const data = await useFetch('/api/home/topic', {
    method: 'GET',
    query: {
      category: topic.value.category,
      page: topic.value.page,
      limit: topic.value.limit,
      sortField: topic.value.sortField,
      sortOrder: topic.value.sortOrder,
    },
    watch: false,
    ...kungalgameResponseHandler,
  })
  return data
}

const { data } = await getTopics()

watch(
  () => [topic.value.category, topic.value.sortField, topic.value.sortOrder],
  async () => {
    const { data: newData } = await getTopics()
    data.value = newData.value
  }
)

const scrollHandler = async () => {
  if (isScrollAtBottom() && topic.value.isLoading) {
    topic.value.page++

    const { data: newData } = await getTopics()

    if (!newData.value?.length) {
      topic.value.isLoading = false
    }

    if (data.value && newData.value) {
      data.value = [...data.value, ...newData.value]
    }
  }
}

const isScrollAtBottom = () => {
  if (content.value) {
    const scrollHeight = content.value.scrollHeight
    const scrollTop = content.value.scrollTop
    const clientHeight = content.value.clientHeight

    const errorMargin = 1.007
    return Math.abs(scrollHeight - scrollTop - clientHeight) < errorMargin
  }
}

onBeforeMount(async () => {
  useTempHomeStore().resetHomePageStatus()
})

onMounted(async () => {
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
      v-for="topic in data"
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

    <KunSkeletonHomeTopic :count="7" v-if="!data" />
    <KunSkeletonHomeTopic
      v-if="topic.isLoading && data && data?.length >= 16"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/css/effect/effect.scss';
.topic-container {
  width: 100%;
  padding: 0 7px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;

  & > div {
    & > div {
      margin: 7px 0;
    }

    &:last-child {
      margin-bottom: 5px;
    }
  }
}

.kungalgame-comet-surround {
  padding: 0;
  flex-shrink: 0;
  border: 2px solid var(--kungalgame-red-4);

  & > div {
    margin: 0 !important;
  }
}
</style>
