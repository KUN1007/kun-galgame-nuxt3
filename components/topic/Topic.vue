<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'
import type { TopicReply } from '~/types/api/topic-reply'

const { tempReply } = storeToRefs(useTempReplyStore())

const props = defineProps<{
  tid: number
  topic: TopicDetail
}>()

const replyData = ref<TopicReply[] | null>()
const isLoadComplete = ref(false)
const pageData = reactive({
  page: 1,
  limit: 30,
  sortOrder: 'asc' as 'asc' | 'desc'
})

const { data, pending, refresh } = await useFetch(
  `/api/topic/${props.tid}/reply`,
  {
    method: 'GET',
    query: pageData,
    watch: false,
    ...kungalgameResponseHandler
  }
)
replyData.value = data.value

const scrollPage = throttle((rid: number) => {
  let timeout: NodeJS.Timeout | null = null
  const childElement = document.querySelector(`#k${rid}`) as HTMLElement

  if (childElement) {
    childElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    childElement.classList.add('active')

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      childElement.classList.remove('active')
    }, 3000)
  } else {
    useMessage(10215, 'info')
  }
}, 1000)

watch(
  () => tempReply.value[0],
  async () => {
    if (tempReply.value[0]) {
      replyData.value?.push(tempReply.value[0])
      await nextTick()
      scrollPage(tempReply.value[0].floor)
      tempReply.value = []
    }
  }
)

// TODO:
watch(
  () => [pageData.page, pageData.sortOrder],
  async (newValue, oldValue) => {
    if (newValue[1] !== oldValue[1]) {
      pageData.page = 1
      isLoadComplete.value = false
    }

    if (pending.value) {
      return
    }

    await refresh()

    if (!data.value) {
      return
    }

    if (newValue[0] !== oldValue[0]) {
      replyData.value = replyData.value?.concat(data.value)
    } else if (newValue[1] !== oldValue[1]) {
      replyData.value = data.value
    }

    if (data.value.length < 30) {
      isLoadComplete.value = true
    }
  }
)
</script>

<template>
  <div class="content">
    <TopicMaster :topic="topic" />

    <TopicTool
      v-if="replyData"
      :reply-data="replyData"
      :pending="pending"
      :sort-order="pageData.sortOrder"
      @set-sort-order="(value) => (pageData.sortOrder = value)"
    />

    <template v-if="replyData">
      <TopicReply
        v-for="reply in replyData"
        :key="reply.rid"
        :reply="reply"
        :title="topic.title"
        @scroll-page="(value) => scrollPage(value)"
      />
    </template>

    <KunDivider
      v-if="replyData && replyData.length >= 30"
      margin="30px"
      padding="0 17px"
    >
      <slot />
      <span
        class="loader"
        v-if="!pending && !isLoadComplete"
        @click="pageData.page++"
      >
        {{ $t('search.load') }}
      </span>
      <span v-if="pending">
        {{ $t('search.loading') }}
      </span>
      <span v-if="isLoadComplete">
        {{ $t('search.complete') }}
      </span>
    </KunDivider>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  padding: 10px;
  margin-bottom: 17px;

  @include kun-blur;
}

.kun-divider {
  font-size: 16px;

  span {
    &:first-child {
      padding-left: 17px;
    }

    &:last-child {
      padding-right: 17px;
    }
  }

  .loader {
    cursor: pointer;

    &:hover {
      color: var(--kungalgame-blue-5);
    }
  }
}

@media (max-width: 700px) {
  .content {
    padding: 0 5px;
  }
}
</style>
