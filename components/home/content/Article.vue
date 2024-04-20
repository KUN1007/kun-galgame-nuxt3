<script setup lang="ts">
const { topics, savedPosition } = storeToRefs(useTempHomeStore())

const navItems = [
  {
    icon: 'lucide:gamepad-2',
    value: 'galgame'
  },
  {
    icon: 'lucide:drafting-compass',
    value: 'technique'
  },
  {
    icon: 'lucide:circle-ellipsis',
    value: 'others'
  }
]

const content = ref<HTMLElement>()
const isLoadingComplete = ref(false)
const pageData = reactive({
  page: 1,
  limit: 10,
  category: 'galgame'
})

const getTopics = async () => {
  const result = await $fetch('/api/home/topic', {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  })
  return result
}

if (!topics.value.length) {
  topics.value = await getTopics()
}

const { data } = await useLazyFetch(`/api/home/pin`, {
  method: 'GET'
})

watch(
  () => pageData.category,
  async () => {
    pageData.page = 1
    topics.value = await getTopics()
  }
)

const scrollHandler = async () => {
  if (isScrollAtBottom() && !isLoadingComplete.value) {
    pageData.page++

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

onMounted(() => {
  content.value?.scrollTo({
    top: savedPosition.value,
    left: 0
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
  <div class="content" ref="content">
    <HomePinned :topics="data" v-if="data?.length" />

    <div class="tool">
      <KunNav
        class="nav"
        :items="navItems"
        :default-value="pageData.category"
        icon-size="20px"
        @set="(value) => (pageData.category = value)"
      />

      <div class="link">
        <NuxtLinkLocale to="/category">
          {{ $t('home.tool.topics') }}
        </NuxtLinkLocale>
        <NuxtLinkLocale to="/galgame">
          {{ $t('home.tool.resources') }}
        </NuxtLinkLocale>
      </div>
    </div>

    <div
      v-for="(kun, index) in topics"
      :key="index"
      :class="hourDiff(kun.upvote_time, 10) ? 'kungalgame-comet-surround' : ''"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>

      <HomeContentTopic :topic="kun" />

      <KunDivider margin="7px" />
    </div>

    <KunSkeletonHomeTopic v-if="!isLoadingComplete" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/css/effect/effect.scss';
.content {
  width: 100%;
  height: calc(100vh - 75px);
  padding: 17px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: var(--kungalgame-shadow-0);

  &::-webkit-scrollbar {
    width: 7px;
  }

  .tool {
    margin-bottom: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .link {
      display: flex;
      align-items: center;

      a {
        margin-left: 10px;
        color: var(--kungalgame-blue-5);
      }
    }
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

@media (max-width: 700px) {
  .content {
    padding: 17px 10px;
  }
}
</style>
