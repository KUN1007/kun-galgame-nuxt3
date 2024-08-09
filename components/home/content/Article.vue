<script setup lang="ts">
import { navItems } from './navItems'

const { topics, page, savedPosition } = storeToRefs(useTempHomeStore())

const content = ref<HTMLElement>()
const isLoadingComplete = ref(false)
const pageData = reactive({
  limit: 10,
  category: 'galgame'
})

const getTopics = async () => {
  const result = await $fetch('/api/home/topic', {
    method: 'GET',
    query: { page: page.value, ...pageData },
    watch: false,
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
    page.value = 1
    topics.value = await getTopics()
  }
)

const scrollHandler = async () => {
  if (isScrollAtBottom() && !isLoadingComplete.value) {
    page.value++

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

    const errorMargin = 300
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

    <HomePinned :topics="data" v-if="data?.length" />

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

    <NuxtLinkLocale class="all" v-if="isLoadingComplete" to="/pool">
      {{ $t('home.all') }}
    </NuxtLinkLocale>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/css/effect/effect.scss';
.content {
  width: 100%;
  height: calc(100dvh - 75px);
  min-height: 777px;
  padding: 17px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  @include kun-blur;

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

.all {
  margin: 20px auto;
  font-size: 20px;
  cursor: pointer;
  color: var(--kungalgame-blue-5);
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid var(--kungalgame-blue-5);
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
