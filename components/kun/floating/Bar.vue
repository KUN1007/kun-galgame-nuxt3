<script setup lang="ts">
const CONFIGS = {
  SCROLL_THRESHOLD: 100,
  DIRECTION_THRESHOLD: 5,
  AUTO_HIDE_TIMEOUT: 2000,
  BOTTOM_THRESHOLD: 1
} as const

const progress = ref(0)
const isVisible = ref(false)
const autoHideStatus = ref(true)
const scrollingDown = ref(true)
const lastScrollY = ref(0)
const isAtBottom = ref(false)

const router = useRouter()

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

  autoHideStatus.value = true
  if (mobileTimer) clearTimeout(mobileTimer)
  mobileTimer = setTimeout(() => {
    autoHideStatus.value = false
  }, CONFIGS.AUTO_HIDE_TIMEOUT)
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  if (mobileTimer) clearTimeout(mobileTimer)
})
</script>

<template>
  <div
    v-if="isVisible"
    :class="
      cn(
        'bg-background fixed right-3 bottom-3 z-100 flex items-center gap-2 rounded-full px-2 py-2 backdrop-blur-sm transition-opacity duration-300 sm:px-4',
        !autoHideStatus && 'hidden'
      )
    "
  >
    <div
      class="bg-default-200 relative hidden h-2 w-[100px] overflow-hidden rounded-full sm:block"
    >
      <span
        class="bg-primary absolute top-0 left-0 h-full rounded-full"
        :style="{
          width: `${progress}%`
        }"
      />
    </div>

    <span class="text-primary hidden text-sm font-medium sm:block">
      {{ Math.round(progress) }}%
    </span>

    <div class="flex flex-col gap-2">
      <KunTooltip :text="buttonText">
        <KunButton
          :is-icon-only="true"
          rounded="full"
          size="lg"
          variant="flat"
          @click="handleScroll"
        >
          <KunIcon class="text-inherit" :name="buttonIcon" />
        </KunButton>
      </KunTooltip>

      <KunButton
        :is-icon-only="true"
        class-name="text-xs flex sm:hidden"
        rounded="full"
        size="lg"
        variant="flat"
      >
        {{ Math.round(progress) }}
      </KunButton>

      <KunButton
        :is-icon-only="true"
        class-name="flex sm:hidden"
        rounded="full"
        size="lg"
        variant="flat"
        @click="router.back()"
      >
        <KunIcon class="text-inherit" name="lucide:arrow-left" />
      </KunButton>
    </div>
  </div>
</template>
