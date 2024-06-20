<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const content = ref<HTMLElement | null>(null)
const isAtBottom = ref(false)
const isContentScroll = ref(false)
const previousScrollTop = ref<number | null>(null)

const { t } = useI18n()
const { isTopicRewriting } = storeToRefs(useTempEditStore())

useHead({
  title: t('seo.edit.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.edit.description')
    }
  ]
})

const checkScroll = debounce(() => {
  if (content.value) {
    isContentScroll.value = true

    const scrollTop = content.value.scrollTop
    const scrollHeight = content.value.scrollHeight
    const clientHeight = content.value.clientHeight
    const errorMargin = 1.007

    isAtBottom.value =
      Math.abs(scrollHeight - scrollTop - clientHeight) < errorMargin
  }
}, 107)

const scrollToBottom = () => {
  if (content.value) {
    previousScrollTop.value = content.value.scrollTop
    content.value.scrollTo({
      top: content.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const scrollToTop = () => {
  if (content.value) {
    content.value.scrollTo({
      top: previousScrollTop.value ?? 0,
      behavior: 'smooth'
    })
    previousScrollTop.value = null
  }
}

onMounted(() => {
  content.value?.addEventListener('scroll', checkScroll)
})

onBeforeUnmount(() => {
  content.value?.removeEventListener('scroll', checkScroll)
})

onBeforeRouteLeave(async (_, __, next) => {
  if (isTopicRewriting.value) {
    const res = await useTempMessageStore().alert({
      'en-us': 'Confirm leaving the page? Your changes will not be saved.',
      'ja-jp': '',
      'zh-cn': '确认离开界面吗？您的更改将不会保存'
    })
    if (res) {
      useTempEditStore().resetRewriteTopicData()
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div ref="content" class="content">
        <ClientOnly>
          <EditTopicTitle />
          <EditTopicEditor :is-show-menu="true" />
          <EditTopicFooter />
        </ClientOnly>
      </div>

      <div
        v-if="isAtBottom"
        class="tool-button top"
        v-tooltip="{
          message: previousScrollTop
            ? { en: 'Return to Previous Position', zh: '回到上次位置' }
            : { en: 'Scroll to Top', zh: '滚动到顶部' },
          position: 'left'
        }"
        @click="scrollToTop"
      >
        <Icon class="icon" name="lucide:arrow-up" />
      </div>

      <div
        v-if="!isAtBottom && isContentScroll"
        class="tool-button bottom"
        v-tooltip="{
          message: { en: 'Scroll to Bottom', zh: '滚动到底部' },
          position: 'left'
        }"
        @click="scrollToBottom"
      >
        <Icon class="icon" name="lucide:arrow-down" />
      </div>
    </div>

    <KunFooter style="margin: 0 auto; padding-top: 10px" />

    <span class="reference">
      Editor powered by
      <a
        href="https://github.com/Milkdown/milkdown"
        target="_blank"
        rel="noopener noreferrer"
      >
        Milkdown
      </a>
      &
      <a
        href="https://github.com/KUN1007/milkdown-vue3-demo"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('header.name') }}
      </a>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.root {
  position: relative;
  height: calc(100vh - 75px);
  min-height: 700px;
  display: flex;
  flex-direction: column;
}

.container {
  position: relative;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  overflow-y: scroll;
  scrollbar-width: none;

  @include kun-blur;

  .content {
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .tool-button {
    position: absolute;
    right: 20px;
    height: 40px;
    width: 40px;
    font-size: 15px;
    color: var(--kungalgame-white);
    cursor: pointer;
    background-color: var(--kungalgame-blue-5);
    border-radius: 20px;
    box-shadow: var(--shadow);

    @include kun-center;
  }

  .top {
    bottom: 80px;

    .icon {
      font-size: 17px;
    }
  }

  .bottom {
    bottom: 20px;

    .icon {
      font-size: 17px;
    }
  }
}

.reference {
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);

  a {
    font-style: oblique;
    color: var(--kungalgame-blue-5);

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 1000px) {
  .container {
    width: 100%;
  }
}
</style>
