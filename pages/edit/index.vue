<script setup lang="ts">
const mainRef = ref<HTMLElement | null>(null)
const atBottom = ref(false)
const previousScrollTop = ref<number | null>(null)

definePageMeta({
  middleware: 'auth'
})

const { t } = useI18n()

useHead({
  title: t('seo.edit.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.edit.description')
    }
  ]
})

const { isTopicRewriting } = storeToRefs(useTempEditStore())

onBeforeRouteLeave(async (_, __, next) => {
  if (isTopicRewriting.value) {
    const res = await useTempMessageStore().alert('AlertInfo.edit.leave', true)
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

const checkScroll = debounce(() => {
  if (mainRef.value) {
    const scrollTop = mainRef.value.scrollTop
    const scrollHeight = mainRef.value.scrollHeight
    const clientHeight = mainRef.value.clientHeight
    if (scrollTop + clientHeight >= scrollHeight - 10 && !atBottom.value) {
      atBottom.value = true
    }
    if (scrollTop + clientHeight < scrollHeight - 10 && atBottom.value) {
      atBottom.value = false
    }
  }
}, 50)

const scrollToBottom = () => {
  if (mainRef.value) {
    previousScrollTop.value = mainRef.value.scrollTop
    console.log(mainRef.value.scrollTop)
    mainRef.value.scrollTo({
      top: mainRef.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const scrollToTop = () => {
  if (mainRef.value) {
    mainRef.value.scrollTo({
      top: previousScrollTop.value ?? 0,
      behavior: 'smooth'
    })
    previousScrollTop.value = null
  }
}

onMounted(() => {
  mainRef.value?.addEventListener('scroll', checkScroll)
})
onBeforeUnmount(() => {
  mainRef.value?.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div ref="mainRef" class="main">
        <KunMilkdownComponentsTitle />
        <KunMilkdownWrapper :is-show-menu="true" />

        <div class="content-footer">
          <EditTags />
          <EditFooter />
        </div>
      </div>
      <transition name="tool-button">
        <div
          v-if="atBottom"
          class="tool-button top"
          v-tooltip="{
            message: previousScrollTop ? '回到上次位置' : '滚动到顶部',
            position: 'left'
          }"
          @click="scrollToTop"
        >
          <Icon class="icon" name="line-md:arrow-left" />
        </div>
      </transition>
      <transition name="tool-button">
        <div
          v-if="!atBottom"
          class="tool-button bottom"
          v-tooltip="{
            message: '滚动到底部',
            position: 'left'
          }"
          @click="scrollToBottom"
        >
          <Icon class="icon" name="line-md:arrow-left" />
        </div>
      </transition>
    </div>

    <KunFooter style="margin: 0 auto; padding-top: 10px" />

    <span
      class="reference"
      style="margin: 0 auto; color: var(--kungalgame-font-color-3)"
    >
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
  transition: all 0.2s;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  box-shadow: var(--shadow);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  color: var(--kungalgame-font-color-3);
  border-radius: 10px;
  box-shadow: var(--kungalgame-shadow-0);
  overflow-y: scroll;
  .main {
    height: 100%;
    overflow-y: scroll;
  }
  .tool-button {
    position: absolute;
    right: 20px;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: var(--kungalgame-white);
    cursor: pointer;
    background-color: var(--kungalgame-blue-5);
    border-radius: 20px;
    box-shadow: var(--kungalgame-shadow-0);
  }
  .top {
    bottom: 80px;
    .icon {
      font-size: 17px;
      transform: rotate(90deg);
    }
  }
  .bottom {
    bottom: 20px;
    .icon {
      font-size: 17px;
      transform: rotate(-90deg);
    }
  }
}

.content-footer {
  padding: 10px;
  padding-top: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reference {
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

.tool-button-enter-active,
.tool-button-leave-active {
  transition: all 0.2s;
}
.tool-button-enter-from,
.tool-button-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
