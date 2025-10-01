<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'

const { data: pinnedPosts } = await useAsyncData(() => {
  return queryCollection('content')
    .where('pin', '=', true)
    .order('modifiedTime', 'DESC')
    .all()
})

const currentSlide = ref(0)
const autoplayInterval = ref<NodeJS.Timeout>()
const carouselRef = ref<HTMLElement | null>(null)
const { isOutside } = useMouseInElement(carouselRef)

const AUTOPLAY_DELAY = 3000
const DRAG_THRESHOLD = 50

const isDragging = ref(false)
const dragStart = ref(0)
const dragOffset = ref(0)

const nextSlide = () => {
  if (!pinnedPosts.value) return
  currentSlide.value = (currentSlide.value + 1) % pinnedPosts.value.length
}

const prevSlide = () => {
  if (!pinnedPosts.value) return
  currentSlide.value =
    (currentSlide.value - 1 + pinnedPosts.value.length) %
    pinnedPosts.value.length
}

const startAutoplay = () => {
  stopAutoplay()
  autoplayInterval.value = setInterval(nextSlide, AUTOPLAY_DELAY)
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = undefined
  }
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  dragStart.value = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  stopAutoplay()
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  e.preventDefault()
  const currentX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  const diff = currentX - dragStart.value
  const containerWidth = carouselRef.value?.offsetWidth || 0
  dragOffset.value = (diff / containerWidth) * 100
}

const endDrag = () => {
  if (!isDragging.value) return

  const threshold = Math.abs(dragOffset.value) > DRAG_THRESHOLD
  if (threshold) {
    if (dragOffset.value > 0) {
      prevSlide()
    } else {
      nextSlide()
    }
  }

  isDragging.value = false
  dragOffset.value = 0
  startAutoplay()
}

const manualSlide = (direction: 'next' | 'prev') => {
  if (direction === 'next') {
    nextSlide()
  } else {
    prevSlide()
  }
  startAutoplay()
}

watch(isOutside, (outside) => {
  if (outside) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    ref="carouselRef"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
    @touchstart.passive="startDrag"
    @touchmove.passive="onDrag"
    @touchend="endDrag"
    class-name="group relative overflow-hidden p-0 cursor-grab"
  >
    <div
      class="flex transition-transform duration-300 ease-in-out"
      :style="{
        transform: `translateX(${-currentSlide * 100 + dragOffset}%)`,
        transition: isDragging ? 'none' : 'transform 300ms ease-in-out'
      }"
    >
      <div
        v-for="post in pinnedPosts"
        :key="post.path"
        class="w-full flex-shrink-0"
      >
        <div class="relative h-[200px] w-full select-none sm:h-[300px]">
          <KunImageNative
            :src="post.banner || '/kungalgame.webp'"
            :alt="post.title"
            class-name="pointer-events-none h-full w-full object-cover select-none"
          />
          <KunCard
            :is-transparent="false"
            :is-hoverable="false"
            :bordered="false"
            class-name="absolute right-0 bottom-0 left-0 m-3"
            content-class="gap-3"
          >
            <KunLink
              underline="none"
              class-name="text-xl sm:text-3xl font-bold text-foreground hover:text-primary transition-colors"
              :to="post.path"
            >
              <h1>{{ post.title }}</h1>
            </KunLink>
            <p class="text-default-700 line-clamp-2 text-sm sm:text-base">
              {{ post.description }}
            </p>
            <KunLink
              class-name="ml-auto text-sm sm:text-base"
              underline="hover"
              :to="post.path"
            >
              阅读更多 >
            </KunLink>
          </KunCard>
        </div>
      </div>
    </div>

    <KunButton
      :is-icon-only="true"
      color="default"
      variant="flat"
      @click="manualSlide('prev')"
      class-name="absolute hidden group-hover:flex top-1/2 left-3 -translate-y-1/2 rounded-full transition-colors"
    >
      <KunIcon name="lucide:chevron-left" />
    </KunButton>
    <KunButton
      :is-icon-only="true"
      color="default"
      variant="flat"
      @click="manualSlide('next')"
      class-name="absolute hidden group-hover:flex top-1/2 right-3 -translate-y-1/2 rounded-full transition-colors"
    >
      <KunIcon name="lucide:chevron-right" />
    </KunButton>

    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
      <span
        v-for="(_, index) in pinnedPosts"
        :key="index"
        class="h-2 w-2 rounded-full transition-colors"
        :class="
          currentSlide === index ? 'bg-foreground/40' : 'bg-foreground/20'
        "
      />
    </div>
  </KunCard>
</template>
