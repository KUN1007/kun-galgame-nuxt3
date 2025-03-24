<script setup lang="ts">
const progress = ref(0)
const isVisible = ref(false)
const showOnMobile = ref(true)
const isSmallScreen = ref(false)
const scrollingDown = ref(true)
const lastScrollY = ref(0)
const isAtBottom = ref(false)

const SCROLL_THRESHOLD = 100
const DIRECTION_THRESHOLD = 5
const MOBILE_TIMEOUT = 2000
const BOTTOM_THRESHOLD = 1
let mobileTimer: NodeJS.Timeout | null = null

const updateProgress = () => {
  const winScroll = window.scrollY
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
  const scrolled = (winScroll / height) * 100

  progress.value = scrolled
  isVisible.value = winScroll > SCROLL_THRESHOLD

  isAtBottom.value = Math.abs(scrolled - 100) < BOTTOM_THRESHOLD

  if (!isAtBottom.value) {
    const scrollDiff = winScroll - lastScrollY.value
    if (Math.abs(scrollDiff) > DIRECTION_THRESHOLD) {
      scrollingDown.value = scrollDiff > 0
    }
  }
  lastScrollY.value = winScroll

  if (isSmallScreen.value) {
    showOnMobile.value = true
    if (mobileTimer) clearTimeout(mobileTimer)
    mobileTimer = setTimeout(() => {
      showOnMobile.value = false
    }, MOBILE_TIMEOUT)
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  window.addEventListener('resize', checkScreenSize)
  checkScreenSize()
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', checkScreenSize)
  if (mobileTimer) clearTimeout(mobileTimer)
})
</script>

<template>
  <div
    v-show="isVisible"
    :class="
      cn(
        'bg-background fixed right-3 bottom-3 z-100 flex items-center gap-2 rounded-full px-4 py-2 shadow-lg backdrop-blur-sm transition-opacity duration-300',
        isSmallScreen
          ? showOnMobile
            ? 'opacity-100'
            : 'opacity-0'
          : 'opacity-100'
      )
    "
  >
    <div
      class="bg-default-200 relative h-2 w-[100px] overflow-hidden rounded-full"
    >
      <span
        class="absolute top-0 left-0 h-full rounded-full transition-all duration-200"
        :style="{
          width: `${progress}%`,
          backgroundColor: 'var(--color-primary)'
        }"
      />
    </div>

    <span
      class="text-sm font-medium"
      :style="{ color: 'var(--color-primary)' }"
    >
      {{ Math.round(progress) }}%
    </span>

    <KunTooltip
      :text="
        isAtBottom ? '滚动到顶部' : scrollingDown ? '滚动到顶部' : '滚动到底部'
      "
    >
      <KunButton
        :is-icon-only="true"
        rounded="full"
        size="lg"
        variant="flat"
        @click="
          isAtBottom
            ? scrollToTop()
            : scrollingDown
              ? scrollToBottom()
              : scrollToTop()
        "
      >
        <Icon
          :name="
            isAtBottom
              ? 'lucide:arrow-up'
              : scrollingDown
                ? 'lucide:arrow-down'
                : 'lucide:arrow-up'
          "
          class="h-5 w-5 text-blue-600"
        />
      </KunButton>
    </KunTooltip>
  </div>
</template>
