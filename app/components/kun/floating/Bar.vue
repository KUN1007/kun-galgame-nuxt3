<script setup lang="ts">
const CONFIGS = {
  SCROLL_THRESHOLD: 100,
  DIRECTION_THRESHOLD: 5,
  MOBILE_TIMEOUT: 2000,
  BOTTOM_THRESHOLD: 1,
  MOBILE_BREAKPOINT: 768
} as const

const progress = ref(0)
const isVisible = ref(false)
const showOnMobile = ref(true)
const isSmallScreen = ref(false)
const scrollingDown = ref(true)
const lastScrollY = ref(0)
const isAtBottom = ref(false)

let mobileTimer: NodeJS.Timeout | null = null

const buttonText = computed(() =>
  isAtBottom.value || !scrollingDown.value ? '滚动到顶部' : '滚动到底部'
)

const buttonIcon = computed(() =>
  isAtBottom.value || !scrollingDown.value
    ? 'lucide:arrow-up'
    : 'lucide:arrow-down'
)

const handleScroll = () => {
  window.scrollTo({
    top:
      isAtBottom.value || !scrollingDown.value
        ? 0
        : document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}

const updateProgress = () => {
  const { scrollY } = window
  const { scrollHeight, clientHeight } = document.documentElement

  const scrolled = (scrollY / (scrollHeight - clientHeight)) * 100
  progress.value = scrolled
  isVisible.value = scrollY > CONFIGS.SCROLL_THRESHOLD
  isAtBottom.value = Math.abs(scrolled - 100) < CONFIGS.BOTTOM_THRESHOLD

  if (!isAtBottom.value) {
    const scrollDiff = scrollY - lastScrollY.value
    if (Math.abs(scrollDiff) > CONFIGS.DIRECTION_THRESHOLD) {
      scrollingDown.value = scrollDiff > 0
    }
  }
  lastScrollY.value = scrollY

  if (isSmallScreen.value) {
    showOnMobile.value = true
    if (mobileTimer) clearTimeout(mobileTimer)
    mobileTimer = setTimeout(() => {
      showOnMobile.value = false
    }, CONFIGS.MOBILE_TIMEOUT)
  }
}

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < CONFIGS.MOBILE_BREAKPOINT
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  window.addEventListener('resize', updateScreenSize)
  updateScreenSize()
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateScreenSize)
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
        class="bg-primary absolute top-0 left-0 h-full rounded-full"
        :style="{
          width: `${progress}%`
        }"
      />
    </div>

    <span class="text-primary text-sm font-medium">
      {{ Math.round(progress) }}%
    </span>

    <KunTooltip :text="buttonText">
      <KunButton
        :is-icon-only="true"
        rounded="full"
        size="lg"
        variant="flat"
        @click="handleScroll"
      >
        <Icon :name="buttonIcon" class="h-5 w-5 text-blue-600" />
      </KunButton>
    </KunTooltip>
  </div>
</template>
