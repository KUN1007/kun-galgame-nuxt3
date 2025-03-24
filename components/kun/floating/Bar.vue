<script setup lang="ts">
const progress = ref(0)
const showBar = ref(false)
const scrollingDown = ref(true)
const lastScrollY = ref(0)

const SCROLL_THRESHOLD = 100
const DIRECTION_THRESHOLD = 5

const updateProgress = () => {
  const winScroll = window.scrollY
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
  const scrolled = (winScroll / height) * 100

  progress.value = scrolled
  showBar.value = winScroll > SCROLL_THRESHOLD

  const scrollDiff = winScroll - lastScrollY.value
  if (Math.abs(scrollDiff) > DIRECTION_THRESHOLD) {
    scrollingDown.value = scrollDiff > 0
  }

  lastScrollY.value = winScroll
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

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div
    class="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm transition-opacity duration-300"
    :class="{ 'opacity-0': !showBar, 'opacity-100': showBar }"
  >
    <div
      class="relative h-2 w-[100px] overflow-hidden rounded-full bg-gray-200"
    >
      <div
        class="absolute top-0 left-0 h-full rounded-full transition-all duration-200"
        :style="{
          width: `${progress}%`,
          backgroundColor: 'var(--color-primary)'
        }"
      ></div>
    </div>

    <span
      class="text-sm font-medium"
      :style="{ color: 'var(--color-primary)' }"
    >
      {{ Math.round(progress) }}%
    </span>

    <button
      v-if="scrollingDown"
      @click="scrollToBottom"
      class="rounded-full p-2 transition-colors hover:bg-gray-100"
      :style="{ color: 'var(--color-primary)' }"
      title="Scroll to bottom"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>

    <button
      v-else
      @click="scrollToTop"
      class="rounded-full p-2 transition-colors hover:bg-gray-100"
      :style="{ color: 'var(--color-primary)' }"
      title="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  </div>
</template>
